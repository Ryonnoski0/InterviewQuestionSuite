<template>
    <div
        :style="{ width: `${computedWidth !== 0 ? computedWidth : totalWidth}px` }"
        class="carousel"
        @mousedown="onDragStart"
        @touchstart="onDragStart">
        <div
            ref="carouselInner"
            class="carousel-inner"
            :style="{ width: `${computedWidth !== 0 ? computedWidth : totalWidth}px` }">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
    
    export default {
        props: {
            itemsPerPage: {
                type: Number,
                default: 1, // 默认每页显示1个项目
            },
            customWidth: {
                type: Number,
                default: 0, // 用户自定义宽度，默认值为0表示未设置
            },
        },
        data() {
            return {
                currentIndex: 0,
                slides: [] as any[],
                width: 0,
                totalWidth: 0,
                isDragging: false,
                startX: 0,
                startTime: 0,
                translateX: 0,
                initialTranslateX: 0,
                animationFrame: 0,
                velocityThreshold: 600, // 速度阈值，用户拖动速度超过该值则切换图片
            };
        },
        computed: {
            computedWidth() {
                return this.customWidth > 0 ? this.customWidth + 14 : this.width;
            },
        },
        mounted() {
            if (this.$slots.default!.length <= 0) {
                console.warn("滚动器没有放入内容，可能会出现问题");
            }
            this.slides = this.$slots.default ?? [];
            this.$nextTick(() => {
                this.calculateWidths();
                this.updateTranslateX(0);
            });
        },
        methods: {
            calculateWidths() {
                // 计算整个轮播的总宽度和每个可见区域的宽度
                let totalWidth = 0;
                this.slides.forEach((vnode) => {
                    const el = vnode.elm as HTMLElement;
                    el.style.flexShrink = "0"; // 禁止缩小
                    totalWidth += el.offsetWidth;
                });
                this.totalWidth = totalWidth;
                this.width = (totalWidth / this.slides.length) * this.itemsPerPage;
            },
            easeInOutQuad(t: number) {
                return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            },
            updateTranslateX(duration = 500) {
                const start = this.translateX;
                const end = -this.getOffsetByIndex(this.currentIndex);
                const startTime = performance.now();

                const animate = (time: number) => {
                    const elapsed = time - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = this.easeInOutQuad(progress);

                    this.translateX = start + (end - start) * easedProgress;
                    (this.$refs.carouselInner as HTMLElement).style.transform = `translateX(${
                        this.translateX - 16 * this.currentIndex
                    }px)`;

                    if (progress < 1) {
                        this.animationFrame = requestAnimationFrame(animate);
                    }
                };

                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                }

                this.animationFrame = requestAnimationFrame(animate);
            },
            getOffsetByIndex(index: number) {
                let offset = 0;
                for (let i = 0; i < index * this.itemsPerPage; i++) {
                    const el = this.slides[i].elm as HTMLElement;
                    offset += el.offsetWidth;
                }
                return offset;
            },
            prevSlide() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                }
                this.updateTranslateX();
            },
            nextSlide() {
                if (this.currentIndex < Math.ceil(this.slides.length / this.itemsPerPage) - 1) {
                    this.currentIndex++;
                }
                this.updateTranslateX();
            },
            goToSlide(index: number) {
                // 确保索引在合法范围内
                index = Math.max(0, Math.min(index, Math.ceil(this.slides.length / this.itemsPerPage) - 1));
                this.currentIndex = index;
                this.updateTranslateX();
            },
            onDragStart(event: MouseEvent | TouchEvent) {
                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                }
                this.isDragging = true;

                if (event.type === "touchstart") {
                    // 触摸事件
                    this.startX = (event as TouchEvent).touches[0].clientX;
                } else {
                    // 鼠标事件
                    this.startX = (event as MouseEvent).clientX;
                }

                this.initialTranslateX = this.translateX;
                this.startTime = performance.now(); // 记录拖动开始的时间

                // 监听全局的拖动和结束事件
                window.addEventListener("mousemove", this.onDrag);
                window.addEventListener("mouseup", this.onDragEnd);
                window.addEventListener("touchmove", this.onDrag);
                window.addEventListener("touchend", this.onDragEnd);
            },

            onDrag(event: MouseEvent | TouchEvent) {
                if (!this.isDragging) return;

                let clientX: number;

                if (event.type === "touchmove") {
                    // 触摸事件
                    clientX = (event as TouchEvent).touches[0].clientX;
                } else {
                    // 鼠标事件
                    clientX = (event as MouseEvent).clientX;
                }

                const deltaX = clientX - this.startX;
                this.translateX = this.initialTranslateX + deltaX;
                (this.$refs.carouselInner as HTMLElement).style.transform = `translateX(${this.translateX}px)`;
            },
            onDragEnd() {
                if (!this.isDragging) return;
                this.isDragging = false;

                // 移除全局的事件监听器
                window.removeEventListener("mousemove", this.onDrag);
                window.removeEventListener("mouseup", this.onDragEnd);
                window.removeEventListener("touchmove", this.onDrag);
                window.removeEventListener("touchend", this.onDragEnd);

                // 计算拖动的距离和时间
                const movedBy = this.translateX - this.initialTranslateX;
                const elapsedTime = (performance.now() - this.startTime) / 1000; // 时间以秒为单位
                const velocity = Math.abs(movedBy / elapsedTime); // 计算拖动速度
                const movedSlides = -Math.round(movedBy / (this.totalWidth / this.slides.length));

                let newIndex = this.currentIndex + movedSlides;

                // 确保索引在合法范围内
                newIndex = Math.max(0, Math.min(newIndex, Math.ceil(this.slides.length / this.itemsPerPage) - 1));

                // 如果速度超过阈值，则切换到下一个/前一个幻灯片
                if (velocity > this.velocityThreshold) {
                    if (movedBy < 0 && this.currentIndex < Math.ceil(this.slides.length / this.itemsPerPage) - 1) {
                        this.nextSlide();
                    } else if (movedBy > 0 && this.currentIndex > 0) {
                        this.prevSlide();
                    } else {
                        this.currentIndex = newIndex;
                    }
                } else {
                    // 否则根据拖动距离来切换
                    this.currentIndex = newIndex;
                }
                this.updateTranslateX();
            },
        },
        watch: {
            currentIndex(newValue, oldValue) {
                this.$emit("slideChange", { newValue, oldValue });
            },
        },
    };
</script>

<style scoped>
    .carousel {
        height: auto;
        overflow-x: hidden;
        overflow-y: visible;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .carousel-inner {
        display: flex;
        /* 提升动画性能 */
        will-change: transform;
        gap: 16px;
    }
</style>

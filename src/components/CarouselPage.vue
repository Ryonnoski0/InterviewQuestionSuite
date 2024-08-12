<template>
    <div class="pagination-container">
        <button
            :class="currentPage === 1 ? 'disabled' : ''"
            class="nav-button"
            @click="prevPage">
            <svg
                class="prev-svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="m10 7.37 7.316 6.86 1.368-1.46L10 4.63l-8.684 8.14 1.368 1.46L10 7.37Z"></path>
            </svg>
        </button>

        <div class="dots">
            <span
                @click="onGoToSlide(index + 1)"
                v-for="(dot, index) in totalPages"
                :key="index"
                :class="{ active: currentPage === index + 1 }"
                class="dot">
            </span>
        </div>

        <button
            :class="currentPage === totalPages ? 'disabled' : ''"
            class="nav-button"
            @click="nextPage">
            <svg
                class="next-svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="m10 7.37 7.316 6.86 1.368-1.46L10 4.63l-8.684 8.14 1.368 1.46L10 7.37Z"></path>
            </svg>
        </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentPage: 1,
                totalPages: 1,
            };
        },
        props: {
            page: {
                type: Object,
                required: true,
            },
            next: {
                type: Function,
                required: true,
            },
            prev: {
                type: Function,
                required: true,
            },
            goToSlide: {
                type: Function,
                required: true,
            },
        },
        created() {
            this.totalPages = this.page.total;
            this.currentPage = this.page.current;
        },
        methods: {
            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.prev();
                }
            },
            nextPage() {
                if (this.currentPage < this.totalPages) {
                    this.currentPage++;
                    this.next();
                }
            },
            onGoToSlide(index) {
                if (this.currentPage === index) return;
                this.currentPage = index;
                this.goToSlide(index);
            },
        },
        watch: {
            currentPage(newValue, oldValue) {
                this.$emit("update:currentChange", newValue);
            },
            page: {
                handler(newVal, oldVal) {
                    this.currentPage = newVal.current;
                },
                deep: true, // 深度监听，确保监听对象内部属性的变化
            },
        },
    };
</script>

<style lang="scss" scoped>
    .pagination-container {
        display: flex;
        align-items: center;
        justify-content: center;

        .nav-button {
            background-color: #333;
            border: none;
            color: white;
            padding: 4px;
            width: 24px;
            height: 24px;
            margin: 0 10px;
            text-transform: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
            svg {
                width: 16px;
                height: 16px;
                padding: 0;
            }
        }
        .prev-svg {
            transform: rotate(-90deg);
        }
        .next-svg {
            transform: rotate(90deg);
        }

        .nav-button:hover {
            background-color: #555;
        }
        .nav-button:last-child .dots {
            display: flex;
            align-items: center;
        }
        .dots {
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            align-items: center;
        }
        .dot {
            cursor: pointer;
            padding: 3px;
            margin: 0 5px;
            background-color: #555;
            border-radius: 50%;
            transition: background-color 0.3s;
        }

        .dot.active {
            cursor: default;
            background-color: #007bff;
        }
        .disabled {
            cursor: default;
            svg {
                color: #fff3;
            }
        }
    }
</style>

<template>
    <div class="announcements">
        <div>
            <div class="acm-title">
                <h3>Announcements</h3>
                <a href="">View All</a>
            </div>
            <div class="amc-list">
                <Carousel
                    @slideChange="slideChange"
                    ref="carousel">
                    <div
                        :key="index"
                        v-for="(acms, index) in amcList"
                        class="group">
                        <div
                            :key="i"
                            v-for="(acm, i) in acms"
                            class="amc">
                            <div class="amc-img">
                                <img
                                    src="/img/img1.jpg"
                                    alt="AnnouncementHeader" />
                                <Nail class="nail" />
                            </div>
                            <div class="amc-content">
                                <p>{{ acm.title }}</p>
                                <span>{{ acm.time }}</span>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
        <CarouselPage
            :goToSlide="goToSlide"
            :next="next"
            :prev="prev"
            @update:currentChange="currentChange"
            :page="acmPage" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import Nail from "@/components/svg/Nail.vue";
    import Carousel from "@/components/Carousel.vue";
    import CarouselPage from "@/components/CarouselPage.vue";
    import type { CarouselRef } from "@/interface/interface";
    interface Announcement {
        title: string;
        time: string;
    }

    export default defineComponent({
        components: {
            Nail,
            Carousel,
            CarouselPage,
        },
        props: {
            announcements: {
                type: Array as () => Announcement[],
                required: true,
                default: () => [],
            },
        },
        data() {
            return {
                acmPage: {
                    current: 1,
                    total: 0,
                },
            };
        },
        computed: {
            amcList(): Announcement[][] {
                const groups: Announcement[][] = [];
                for (let i = 0; i < this.announcements.length; i += 2) {
                    groups.push(this.announcements.slice(i, i + 2));
                }
                return groups;
            },
        },
        created() {
            this.acmPage.total = Math.floor(this.announcements.length / 2);
        },
        methods: {
            currentChange(current: number) {
                this.acmPage.current = current;
            },
            prev() {
                const carousel = this.$refs.carousel as CarouselRef;
                if (carousel) {
                    carousel.prevSlide();
                }
            },
            next() {
                const carousel = this.$refs.carousel as CarouselRef;
                if (carousel) {
                    carousel.nextSlide();
                }
            },
            goToSlide(index: number) {
                const carousel = this.$refs.carousel as CarouselRef;
                if (carousel) {
                    carousel.goToSlide(index);
                }
            },
            slideChange(current: { newValue: number; oldValue: number }) {
                this.acmPage.current = current.newValue + 1;
            },
        },
    });
</script>

<style lang="scss" scoped>
    .announcements {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 420px;

        .acm-title {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            align-content: center;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-bottom: 14px;

            h3 {
                font-size: 24px;
                font-weight: 700;
                line-height: 115%;
                font-family: Inter;
                font-style: normal;
                letter-spacing: -0.02em;
                color: #fff;
            }
            a {
                font-size: 16px;
                font-weight: 500;
                line-height: 120%;
                font-family: Inter;
                font-style: normal;
                letter-spacing: -0.02em;
                color: rgb(136 136 136);
                margin-right: 16px;
            }
        }

        .amc-list {
            width: 420px;
            width: auto;
            overflow: hidden;
            .group {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 20px;
            }
        }

        .amc {
            cursor: pointer;
            min-width: 420px;
            display: flex;
            background-color: #313131;
            padding: 12px;
            padding-bottom: 26px;
            border-radius: 12px;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 15px;
            transition: transform 0.5s ease-in-out; /* 滑动动画 */

            .amc-img {
                position: relative;
                width: 48px;
                height: 48px;
                img {
                    position: absolute;
                    width: 48px;
                    border-radius: 6px;
                }
                .nail {
                    border-radius: 50%;
                    background-color: rgb(18 122 254);
                    color: #fff;
                    position: absolute;
                    padding: 3px;
                    right: -6px;
                    bottom: -6px;
                }
            }

            .amc-content {
                color: #fff;
                p {
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 120%;
                    font-family: Inter;
                    font-style: normal;
                    letter-spacing: -0.02em;
                }
                span {
                    opacity: 0.4;
                    font-size: 14px;
                }
            }
        }
    }
</style>

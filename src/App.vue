<template>
    <div id="app">
        <div id="title">
            <div id="banner">
                <Carousel
                    @slideChange="bannerSlideChange"
                    ref="carousel">
                    <Banner
                        :key="index"
                        v-for="(banner, index) in banners"
                        :placeholderColor="banner.placeholderColor"
                        :slide="banner.slide"
                        :slidesPerson="banner.slidesPerson"
                        :text="banner.text" />
                </Carousel>
                <CarouselPage
                    :goToSlide="goToSlide"
                    :next="bannerNext"
                    :prev="bannerPrev"
                    @update:currentChange="bannerCurrentChange"
                    :page="bannerPage" />
            </div>

            <Announcements
                id="announcements"
                :announcements="announcements" />
        </div>
        <TopSeries id="TopSeries" />
    </div>
</template>

<script lang="ts">
    import Carousel from "@/components/Carousel.vue";
    import Like from "@/components/svg/Like.vue";
    import Badge from "@/components/svg/Badge.vue";
    import Banner from "@/components/Banner.vue";
    import CarouselPage from "@/components/CarouselPage.vue";
    import Announcements from "@/components/Announcements.vue";
    import TopSeries from "@/components/TopSeries.vue";
    import type { CarouselRef } from "@/interface/interface.ts";

    export default {
        name: "app",
        components: {
            Carousel,
            Like,
            Badge,
            Banner,
            CarouselPage,
            Announcements,
            TopSeries,
        },
        mounted() {},
        data() {
            return {
                banners: [
                    {
                        placeholderColor: {
                            backgroundImage: "linear-gradient(to top, #bd5815, #bd581500)",
                            backgroundColor: "rgb(189, 88, 21)",
                        },
                        slide: { image: "/img//banner1.jpg", alt: "Slide 1" },
                        slidesPerson: { image: "/img//Person1.webp", alt: "Person 1" },
                        text: {
                            title: "Barbarian Quest",
                            praiseRate: 91,
                            isBadge: true,
                            isOngoing: true,
                            detail: `In the Stone Axe Tribe, a band of young warriors, led by the spirited
                        Urich, embarks on a hunt in the forbidden Sky Mountains. Unknowingly, they cross into an
                        unseen civilization, revealing two distinct worlds divided by the mountains. Urich, a
                        curious and charismatic barbarian, is enthralled by this new world of endless wonders.
                        Join Urich as he explores unfamiliar lands and make thrilling discoveries, and
                        unexpected alliances.`,
                        },
                    },
                    {
                        placeholderColor: {
                            backgroundImage: "linear-gradient(to top, #aa6109, #aa610900)",
                            backgroundColor: "#aa6109",
                        },
                        slide: { image: "/img//banner2.jpg", alt: "Slide 2" },
                        slidesPerson: { image: "/img//Person2.webp", alt: "Person 2" },
                        text: {
                            title: "Wayfarer",
                            praiseRate: 61,
                            isBadge: true,
                            isOngoing: true,
                            detail: `Xiao Nanfeng has a deeply held secret: he retains memories of his past life on Earth. Trained as a scholar and wise beyond his years, he leverages his understanding to free himself from captivity and embarks on the path of cultivation. His goal is to find his missing parents, ten years lost. Loyal allies will accompany him, and fierce enemies will deter him—but talented cultivator though he might be, Xiao Nanfeng's greatest strength has always been his mind. `,
                        },
                    },
                    {
                        placeholderColor: {
                            backgroundImage: "linear-gradient(to top, #21364e, #21364e00)",
                            backgroundColor: "#21364e",
                        },
                        slide: { image: "/img//banner3.jpg", alt: "Slide 3" },
                        slidesPerson: { image: "/img//Person3.webp", alt: "Person 3" },
                        text: {
                            title: "Tome of Troubled Times",
                            praiseRate: 87,
                            isBadge: true,
                            isOngoing: true,
                            detail: `Summary
                    A young man plagued by recurring nightmares finds himself visiting a blind fortune teller, who sends him to a world of martial arts that looks a lot like the
                    `,
                        },
                    },
                ],
                bannerPage: {
                    current: 1,
                    total: 0,
                },

                announcements: [
                    {
                        title: "Trials of the Abyss is live!",
                        time: "1 days ago",
                    },
                    {
                        title: "Trials of the Abyss is live!",
                        time: "2 days ago",
                    },
                    {
                        title: "Trials of the Abyss is live!",
                        time: "3 days ago",
                    },
                    {
                        title: "Trials of the Abyss is live!",
                        time: "4 days ago",
                    },
                    {
                        title: "Trials of the Abyss is live!",
                        time: "5 days ago",
                    },
                    {
                        title: "Trials of the Abyss is live!",
                        time: "6 days ago",
                    },
                    {
                        title: "Trials of the Abyss is live!",
                        time: "7 days ago",
                    },
                    {
                        title: "Trials of the Abyss is live!",
                        time: "8 days ago",
                    },
                ],
            };
        },
        created() {
            this.bannerPage.total = this.banners.length;
        },
        methods: {
            bannerCurrentChange(current:number) {
                this.bannerPage.current = current;
            },
            bannerPrev() {
                (this.$refs.carousel as CarouselRef).prevSlide();
            },
            bannerNext() {
                (this.$refs.carousel as CarouselRef).nextSlide();
            },
            goToSlide(index:number) {
                (this.$refs.carousel as CarouselRef).goToSlide(index);
            },
            //分页变化
            bannerSlideChange(current: { newValue: number; old: number }) {
                this.bannerPage.current = current.newValue + 1;
            },
        },
    };
</script>
<style lang="scss" scoped>
    #app {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        align-content: center;

        #title {
            margin-top: 50px;
            display: flex;
            height: 301px;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;

            #banner {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                align-content: center;
                gap: 13px;
            }
            #announcements {
                height: 100%;
                margin-left: 40px;
            }
        }
        #TopSeries {
            width: 1200px;
            margin-top: 30px;
        }
    }
</style>

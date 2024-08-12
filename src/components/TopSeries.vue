<template>
    <div class="top-series">
        <div class="title">
            <h1>First, The Top Series</h1>
            <h2>Let’s read top stories by genre!</h2>
        </div>
        <div class="cards-container">
            <Carousel
                :customWidth="1224"
                :itemsPerPage="4"
                class="cards-container-carousel">
                <CardComponent
                    v-for="(card, index) in cards"
                    :key="index"
                    :gradientColor="card.gradientColor"
                    :headerText="card.headerText"
                    :imageUrl="card.imageUrl"
                    :showSubheader="card.showSubheader"
                    :subheaderText="card.subheaderText"
                    :subheaderPosition="card.subheaderPosition"
                    :titleText="card.titleText"
                    :progressText="card.progressText"
                    :descriptionText="card.descriptionText" />
            </Carousel>
        </div>
    </div>
</template>

<script lang="ts">
    import Carousel from "@/components/Carousel.vue";
    import CardComponent from "@/components/CardComponent.vue";

    export default {
        name: "TopSeries",
        components: {
            Carousel,
            CardComponent,
        },
        data() {
            return {
                cards: [
                    {
                        gradientColor: "#5199f5",
                        headerText: "Romance",
                        imageUrl: "/img/tt1.png",
                        showSubheader: true,
                        subheaderText: "Ongoing",
                        subheaderPosition: "top-right",
                        titleText: "Dragon War God",
                        progressText: "62%",
                        descriptionText:
                            "Long Chen, once a powerless youth, suddenly obtained the key to becoming the Dragon Warrior from his dying father. In a world where power rules supreme, he’s constantly improving his techniques and risks his life to protect the people he loves. Set in a traditional wuxia world, join us on Long Chen’s adventure to become the Dragon Warrior and unravel the mystery of the dragon’s extinction!",
                    },
                    {
                        gradientColor: "#54bee1",
                        headerText: "Cultivation",
                        imageUrl: "/img/tt2.png",
                        showSubheader: true,
                        subheaderText: "Ongoing",
                        subheaderPosition: "top-right",
                        titleText: "Unsheathed",
                        progressText: "81%",
                        descriptionText:
                            "The gathering of exotic creatures, the mysterious girl is  full of mutated genes, and she discovers her mission while searching for her identity......",
                    },
                    {
                        gradientColor: "#5fb48c",
                        headerText: "Cultivation",
                        imageUrl: "/img/tt3.png",
                        showSubheader: true,
                        subheaderText: "Ongoing",
                        subheaderPosition: "top-left",
                        titleText: "Unsheathed",
                        progressText: "81%",
                        descriptionText:
                            "The gathering of exotic creatures, the mysterious girl is  full of mutated genes, and she discovers her mission while searching for her identity......",
                    },
                    {
                        gradientColor: "#739d5e",
                        headerText: "Cultivation",
                        imageUrl: "/img/tt4.png",
                        showSubheader: true,
                        subheaderText: "Ongoing",
                        subheaderPosition: "top-left",
                        titleText: "Unsheathed",
                        progressText: "81%",
                        descriptionText:
                            "The gathering of exotic creatures, the mysterious girl is  full of mutated genes, and she discovers her mission while searching for her identity......",
                    },
                    {
                        gradientColor: "#5199f5",
                        headerText: "Romance",
                        imageUrl: "/img/tt1.png",
                        showSubheader: true,
                        subheaderText: "Ongoing",
                        subheaderPosition: "top-right",
                        titleText: "Dragon War God",
                        progressText: "62%",
                        descriptionText:
                            "Long Chen, once a powerless youth, suddenly obtained the key to becoming the Dragon Warrior from his dying father. In a world where power rules supreme, he’s constantly improving his techniques and risks his life to protect the people he loves. Set in a traditional wuxia world, join us on Long Chen’s adventure to become the Dragon Warrior and unravel the mystery of the dragon’s extinction!",
                    },
                    {
                        gradientColor: "#54bee1",
                        headerText: "Cultivation",
                        imageUrl: "/img/tt2.png",
                        showSubheader: true,
                        subheaderText: "Ongoing",
                        subheaderPosition: "top-right",
                        titleText: "Unsheathed",
                        progressText: "81%",
                        descriptionText:
                            "The gathering of exotic creatures, the mysterious girl is  full of mutated genes, and she discovers her mission while searching for her identity......",
                    },
                    {
                        gradientColor: "#5fb48c",
                        headerText: "Cultivation",
                        imageUrl: "/img/tt3.png",
                        showSubheader: true,
                        subheaderText: "Ongoing",
                        subheaderPosition: "top-left",
                        titleText: "Unsheathed",
                        progressText: "81%",
                        descriptionText:
                            "The gathering of exotic creatures, the mysterious girl is  full of mutated genes, and she discovers her mission while searching for her identity......",
                    },
                    {
                        gradientColor: "#739d5e",
                        headerText: "Cultivation",
                        imageUrl: "/img/tt4.png",
                        showSubheader: true,
                        subheaderText: "Ongoing",
                        subheaderPosition: "top-left",
                        titleText: "Unsheathed",
                        progressText: "81%",
                        descriptionText:
                            "The gathering of exotic creatures, the mysterious girl is  full of mutated genes, and she discovers her mission while searching for her identity......",
                    },
                ],
            };
        },
    };
</script>

<style lang="scss" scoped>
    .top-series {
        .title {
            color: #fff;
            margin-bottom: 20px;
            h1 {
                padding-top: 8px;
                padding-bottom: 8px;
                font-size: 28px;
                font-weight: 700;
                line-height: 115%;
                font-family: Inter, sans-serif;
                letter-spacing: -0.02em;
            }
            h2 {
                font-size: 17px;
                font-weight: 500;
                line-height: 120%;
                font-family: Inter, sans-serif;
                letter-spacing: -0.02em;
                opacity: 0.6;
            }
        }

        .cards-container {
            display: flex;
            width: 1224px;
            flex-wrap: wrap;
            .cards-container-carousel {
                width: 1200px;
            }
        }
    }
</style>

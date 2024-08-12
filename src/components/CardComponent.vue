<template>
    <div
        class="card"
        :style="{
            backgroundColor: cardBackgroundColor,
            backgroundImage: generateBackgroundImage(gradientColor),
            ...customStyles,
        }">
        <div class="card-header">{{ headerText }}</div>
        <ImageCard
            :imageUrl="imageUrl"
            :showSubheader="showSubheader"
            :subheaderText="subheaderText"
            :subheaderPosition="subheaderPosition" />
        <div class="card-title">{{ titleText }}</div>
        <div class="card-progress">
            <Like style="width: 13px" />
            <div>{{ progressText }}</div>
        </div>
        <div class="card-description">{{ descriptionText }}</div>
    </div>
</template>

<script lang="ts">
    import Like from "@/components/svg/Like.vue";
    import ImageCard from "@/components/ImageCard.vue";

    export default {
        name: "CardComponent",
        components: {
            Like,
            ImageCard,
        },
        props: {
            cardBackgroundColor: {
                type: String,
                default: "rgb(214, 226, 241)", // 默认背景颜色
            },
            gradientColor: {
                type: String,
                default: "#5199f5", // 默认的渐变颜色
            },
            headerText: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
            showSubheader: {
                type: Boolean,
                default: true,
            },
            subheaderText: {
                type: String,
                default: "Ongoing",
            },
            subheaderPosition: {
                type: String,
                default: "top-right", // 可选值: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
            },
            titleText: {
                type: String,
                required: true,
            },
            progressText: {
                type: String,
                required: true,
            },
            descriptionText: {
                type: String,
                required: true,
            },
            customStyles: {
                type: Object,
                default: () => ({}),
            },
        },
        methods: {
            generateBackgroundImage(color: string) {
                return `radial-gradient(152.92% 74.06% at 50% 3.44%, ${color}, #2c84f300), 
                    linear-gradient(180deg, #fff0 15.62%, #fff9 49.62%, #fff0 63.89%)`;
            },
        },
    };
</script>

<style scoped>
    .card {
        width: 290px;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 320px;
        padding: 16px;
        border-radius: 12px;
        text-align: center;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        /* background-image 已通过 props 动态设置 */
    }

    .card-header {
        color: #fff;
        font-size: 15.2px;
        font-weight: 600;
        line-height: 120%;
        font-family: Inter, sans-serif;
        letter-spacing: -0.02em;
    }

    .card-title {
        color: rgb(33, 33, 33);
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 4px;
    }

    .card-progress {
        color: rgb(33, 33, 33);
        font-size: 14px;
        display: flex;
        gap: 4px;
        font-weight: 700;
        align-items: center;
    }

    .card-description {
        height: 32px;
        font-size: 13.2px;
        font-weight: 400;
        line-height: 120%;
        font-family: Inter, sans-serif;
        color: rgb(66, 66, 66);
        letter-spacing: -0.02em;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
    }
</style>

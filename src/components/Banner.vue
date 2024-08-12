<template>
    <div class="slide">
        <div class="slide-content">
            <img
                class="slide-bg"
                :src="slide.image"
                :alt="slide.alt" />
            <div
                :style="{ backgroundImage: placeholderColor.backgroundImage }"
                class="gradient-placeholder"></div>

            <div
                :style="{ background: placeholderColor.backgroundColor }"
                class="placeholder"></div>

            <div class="slide-person">
                <img
                    class="person-img"
                    :src="slidesPerson.image"
                    :alt="slidesPerson.alt" />
                <div
                    :style="{ backgroundImage: placeholderColor.backgroundImage }"
                    class="img-gradient-placeholder"></div>
            </div>
            <div class="item">
                <p class="title">{{ text.title }}</p>
                <div class="comment">
                    <span class="star">
                        <Like />{{ text.praiseRate }}%
                        <Badge v-if="text.isBadge" />
                    </span>
                    <span v-if="text.isOngoing">Ongoing</span>
                    <div class="detail">{{ text.detail }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Carousel from "@/components/Carousel.vue";
    import Like from "@/components/svg/Like.vue";
    import Badge from "@/components/svg/Badge.vue";
    export default {
        name: "Banner",
        components: {
            Carousel,
            Like,
            Badge,
        },
        props: {
            placeholderColor: {
                type: Object,
                required: true,
            },
            slide: {
                type: Object,
                required: true,
            },
            slidesPerson: {
                type: Object,
                required: true,
            },
            text: {
                type: Object,
                required: true,
            },
        },
        mounted() {},
        data() {
            return {};
        },
    };
</script>

<style lang="scss" scoped>
    .slide {
        position: relative;
        height: 256px;
        margin-top: 8px;
        width: 740px;
        border-radius: 12px;

        .slide-content {
            width: 740px;
            border-radius: 12px;

            .slide-person {
                width: 100%;
                position: relative;
                overflow: visible;
                top: -8px;
                border-radius: 12px;

                .person-img {
                    height: 264px;
                    right: 0;
                    object-fit: cover;
                    object-position: bottom;
                    z-index: 3;
                    border-radius: 12px;
                }

                .img-gradient-placeholder {
                    position: absolute;
                    width: 256px;
                    height: 100px;
                    top: 164px;
                    right: 0;
                    z-index: 4;
                    border-radius: 12px;
                }
            }

            .item {
                width: 100%;
                height: 100%;
                position: absolute;
                padding-right: 240px;
                padding-left: 32px;
                padding-top: 36px;
                padding-bottom: 36px;
                z-index: 5;
                --tw-text-opacity: 1;
                color: rgb(255 255 255 / var(--tw-text-opacity));
                font-size: 1rem;
                font-weight: 700;

                .title {
                    font-size: 28px;
                    line-height: 115%;
                    font-style: normal;
                    letter-spacing: -0.02em;
                }

                .comment {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 16px;
                    gap: 10px;

                    .star {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }

                    .detail {
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 120%;
                        font-family: Inter;
                        font-style: normal;
                        letter-spacing: -0.02em;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        line-clamp: 3;
                    }
                }
            }
        }
    }

    img {
        position: absolute;
        border-radius: 12px;
    }

    .slide-bg {
        border-radius: 12px;
        width: 100%;
        height: 100%;
    }

    .placeholder {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 48px;
        bottom: 0;
        border-bottom-left-radius: 12px;
        border-bottom-right-radius: 12px;
    }

    .gradient-placeholder {
        width: 100%;
        height: 100px;
        position: absolute;
        bottom: 48px;
        z-index: 2;
        // border-radius: 12px;
    }
</style>

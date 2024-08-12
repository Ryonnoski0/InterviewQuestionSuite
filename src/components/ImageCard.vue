<template>
    <div class="image-card">
        <div
            v-if="showSubheader"
            :class="['subheader', positionClass]">
            {{ subheaderText }}
        </div>
        <div
            class="card-image"
            :style="{ backgroundImage: `url(${imageUrl})` }"></div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "ImageCard",
        props: {
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
        },
        computed: {
            positionClass() {
                switch (this.subheaderPosition) {
                    case "top-left":
                        return "top-left";
                    case "top-right":
                        return "top-right";
                    case "bottom-left":
                        return "bottom-left";
                    case "bottom-right":
                        return "bottom-right";
                    default:
                        return "top-right";
                }
            },
        },
    };
</script>

<style scoped>
    .image-card {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }

    .subheader {
        background: #a39f9fa2;
        padding: 4px 6px;
        color: #fff;
        border-radius: 0 0 4px 4px;
        font-size: 9.6px;
        font-weight: 700;
        font-family: Inter, sans-serif;
        letter-spacing: -0.02em;
        position: absolute;
        z-index: 1;
    }

    .card-image {
        width: 112px;
        height: 163px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .top-left {
        top: 0;
        left: 0px;
        border-radius: 0 0 4px 4px;
    }

    .top-right {
        top: 0;
        right: 2px;
        border-radius: 0 0 4px 4px;
    }

    .bottom-left {
        bottom: 0;
        left: 0px;
        border-radius: 4px 0 0 4px;
    }

    .bottom-right {
        bottom: 0;
        right: 2px;
        border-radius: 4px 4px 0 0;
    }
</style>

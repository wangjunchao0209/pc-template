<template>
    <ls-overlay center>
        <video controls v-if="isVideo">
            <source :src="viewSrc" type="video/mp4" />
            <source :src="viewSrc" type="video/ogg" />
            <source :src="viewSrc" type="video/quicktime" />
        </video>
        <img v-else :src="viewSrc" alt="" />
        <ls-icon-close
            class="ls-preview-close"
            @click="closeBtn"
        ></ls-icon-close>
    </ls-overlay>
</template>
<script>
import { defineComponent, computed } from "vue";
export default defineComponent({
    name: "LsPreview",
    props: {
        previewStatus: Boolean,
        viewSrc: String,
        isVideo: {
            type: String,
            default: false,
        },
    },
    setup(prop, { emit }) {
        const previewStatus = computed({
            get: () => prop.previewStatus,
            set: value => {
                emit("update:previewStatus", value);
            },
        });
        const closeBtn = () => {
            previewStatus.value = false;
        };
        return {
            previewStatus,
            closeBtn,
        };
    },
});
</script>
<style lang="scss" scoped>
@import "../theme-style/preview";
</style>

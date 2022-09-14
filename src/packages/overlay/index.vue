<template>
    <teleport :to="to">
        <div :class="['ls-overlay', { 'no-mask': noMask, center }]">
            <slot></slot>
        </div>
    </teleport>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "LsOverlay",
    props: {
        to: {
            type: String,
            default: "body",
        },
        noMask: Boolean,
        center: Boolean,
    },
});
</script>
<style lang="scss" scoped>
@import "../theme-style/overlay";
</style>

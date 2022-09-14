<template>
    <ls-overlay center :to="to" v-if="modelValue">
        <div :class="[{ drawerShow: modelValue }, cClass]">
            <div class="drawer-title" v-if="!notTitle">
                <template v-if="title">
                    <div class="drawer-title-prop">{{ title }}</div>
                </template>
                <template v-else>
                    <slot name="title"></slot>
                </template>
                <ls-icon-close
                    v-if="showClose"
                    class="close"
                    @click="close"
                ></ls-icon-close>
            </div>
            <section>
                <slot></slot>
            </section>
            <div class="drawer-foot">
                <slot name="foot"></slot>
            </div>
        </div>
    </ls-overlay>
</template>
<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: "LsDrawer",
    props: {
        size: String,
        showClose: Boolean,
        notTitle: Boolean,
        to: {
            type: String,
            default: "body",
        },
        title: String,
        modelValue: Boolean
    },
    setup(prop, { emit }) {
        const cClass = computed(() => `draw-pop pop-${prop.size}`);
        const close = () => {
            emit("update:modelValue", false)
        };
        return {
            cClass,
            close,
        };
    },
});
</script>
<style lang="scss" scoped>
@import "../theme-style/drawer";
</style>

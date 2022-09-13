<template>
    <div class="search-module" ref="search_module">
        <slot></slot>
        <span class="show" v-show="showOpen && !noBtn" @click="open">
            <span>{{ show ? "展开" : "收起" }}</span>
            <ls-icon-down-arrow
                :class="['arrow', { rotate: show }]"
            ></ls-icon-down-arrow>
        </span>
    </div>
</template>
<script>
import { defineComponent, ref, nextTick, onUnmounted } from "vue";
export default defineComponent({
    name: "LsSearchModule",
    props: {
        noBtn: {
            type: Boolean,
            default: false,
        }
    },
    setup(prop, { emit }) {
        if(prop.noBtn) return
        let show = ref(false);
        let showOpen = ref(false);
        const search_module = ref(null);
        let height = ref(0);
        let time = 0;
        const setHeight = () => {
            if (time) clearTimeout(time);
            time = setTimeout(() => {
                height.value = search_module.value.offsetHeight;
                if (height.value > 120) {
                    showOpen.value = true;
                } else {
                    showOpen.value = false;
                }
                emit("show", show.value, showOpen.value);
            }, 300);
        };
        window.addEventListener("resize", setHeight);
        nextTick(() => {
            setHeight();
        });
        onUnmounted(() => {
            window.removeEventListener("resize", setHeight);
        });
        const open = () => {
            show.value = !show.value;
            emit("open", show.value);
        };
        return {
            show,
            showOpen,
            open,
            search_module,
            height,
        };
    },
});
</script>
<style lang="scss" scoped>
@import "../theme-style/search-module";
</style>

<template>
    <span
        :class="[
            'ls-tag',
            `ls-tag--${type}`,
            `ls-tag-${sizes}`,
            { round },
        ]"
        :style="{'--background': background, '--color': color}"
        v-for="(item, index) in tagList"
        :key="item.value"
    >
        <span class="ls-tag-name" >{{item.label}}</span>
        <ls-icon-close v-if="clear && !item.disabled" @click.stop="close(item, index)"></ls-icon-close>
    </span>
</template>
<script>
import { computed, defineComponent, reactive } from "vue";

export default defineComponent({
    name: "LsTag",
    props: {
        type: {
            type: String,
            default: "default",
        },
        clear: Boolean,
        background: Boolean,
        disabled: Boolean,
        round: Boolean,
        label: [String, Array],
        value: String,
        size: String,
        color: {
            type: String,
            default: "",
        },
    },
    setup(prop, event) {
        console.log(prop.label);
        const sizes = computed(() => prop.size || window.componentSize);
        let tagList = reactive([])
        if(prop.label instanceof Array) {
            tagList = prop.label
        } else if (typeof prop.label === 'string') {
            tagList = [
                {
                    label: prop.label,
                    value: prop.value,
                    disabled: prop.disabled
                }
            ]
        } else {
            throw new Error('tag仅支持String/Array')
        }
        const close = (item, index) => {
            if (prop.disabled) return;
            event.emit("close", {data: item, index});
        };
        return {
            sizes,
            close,
            tagList
        };
    },
});
</script>
<style lang="scss" scoped>
@import "../theme-style/tag";
</style>

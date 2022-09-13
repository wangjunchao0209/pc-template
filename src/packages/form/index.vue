<template>
    <div :class="['input-list', {baseline, hor: mode === 'hor', ver: mode === 'ver'}]" :style="style">
        <div v-show="label" :class="['is-title', {'is-important': required}]">{{label}}</div>
        <slot></slot>
    </div>
</template>

<script>
import { computed, defineComponent, ref, getCurrentInstance } from "vue";

export default defineComponent({
    name: "LsForm",
    props: {
        label: String,
        required: Boolean,
        baseline: Boolean,
        mode: {
            type: String,
            default: 'hor'
        }
    }
});
</script>

<style lang="scss" scoped>
@import "../theme-style/form";
</style>

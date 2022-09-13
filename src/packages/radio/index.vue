<template>
    <div
        :class="['radio-wrap', `radio-${sizes}`, { disabled }]"
        @click="handleClick"
    >
        <div class="radio">
            <div :class="['hook', { 'box-click-it': checked }]"></div>
        </div>
        <div class="label-name">{{ label }}</div>
    </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
    name: "LsRadio",
    props: {
        label: String,
        value: [String, Number],
        checked: [String, Number],
        disabled: Boolean,
        size: String,
    },
    setup(prop, { emit }) {
        const sizes = computed(() => prop.size || window.componentSize);
        const checked = computed({
            get: () => prop.checked === prop.value,
            set: value => {
                emit("update:checked", value);
                emit("change", value);
            },
        });
        const handleClick = () => {
            if (prop.disabled || checked.value) return;
            checked.value = prop.value;
        };
        return {
            checked,
            handleClick,
            sizes,
        };
    },
});
</script>
<style scoped lang="scss">
@import "../theme-style/radio";
</style>

<template>
    <div
        :class="['checkbox-wrap', `checkbox-${sizes}`, { disabled }]"
        @click="handleClick"
    >
        <div
            :class="[
                'checkbox',
                { 'box-click hook': checked, half: half && !checked },
            ]"
        >
            <!-- <div class="hook" v-if="checked"></div> -->
        </div>
        <div class="label-name">{{ label }}</div>
    </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
    name: "LsCheckbox",
    props: {
        label: String,
        disabled: Boolean,
        checked: Boolean,
        size: String,
        half: Boolean,
    },
    setup(prop, { emit }) {
        const sizes = computed(() => prop.size || window.componentSize);
        const checked = computed({
            get: () => prop.checked,
            set: value => {
                emit("update:checked", value);
                emit("change", value);
            },
        });
        const handleClick = () => {
            if (prop.disabled) return;
            checked.value = !checked.value;
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
@import "../theme-style/checkbox";
</style>

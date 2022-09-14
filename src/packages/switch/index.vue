<template>
    <div
        :class="['switch', `switch-${sizes}`, { disabled }]"
        :style="{
            '--active-color': switchStatus ? activeColor : unActiveColor,
        }"
        @click="switchBtn"
    >
        <span
            :class="[
                'switch-text',
                {
                    'actived-text': switchStatus,
                    'unactived-text': !switchStatus,
                },
            ]"
            v-show="activeText && unActiveText"
            >{{ switchStatus ? activeText : unActiveText }}</span
        >
        <span
            :class="[
                'circle',
                { actived: switchStatus, unactived: !switchStatus },
            ]"
        ></span>
    </div>
</template>
<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: "LsSwitch",
    props: {
        type: {
            type: String,
            default: "default",
        },
        switchStatus: {
            type: [Boolean, Number],
            default: false,
        },
        size: {
            type: String,
            default: "small",
        },
        disabled: [Number, Boolean],
        activeColor: {
            type: String,
            default: "#04a17e",
        },
        unActiveColor: {
            type: String,
            default: "#7c8b9b",
        },
        activeText: String,
        unActiveText: String,
    },
    setup(prop, event) {
        const sizes = computed(() => prop.size || window.componentSize);
        const switchStatus = computed({
            get: () => Boolean(prop.switchStatus),
            set: value => {
                event.emit("update:switchStatus", value);
                event.emit("change", value);
            },
        });
        const switchBtn = () => {
            if (prop.disabled) return;
            switchStatus.value = !switchStatus.value;
        };
        return {
            sizes,
            switchStatus,
            switchBtn,
        };
    },
});
</script>
<style lang="scss" scoped>
@import "../theme-style/switch";
</style>

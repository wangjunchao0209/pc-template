<template>
    <div class="ls-progress-circle" v-if="circle">
        <svg viewBox="0 0 100 100">
            <path
                class="el-progress-circle__track"
                d="
            M 50 50
            m 0 -47
            a 47 47 0 1 1 0 94
            a 47 47 0 1 1 0 -94
            "
                stroke="#ccc"
                :stroke-width="stroke"
                fill="none"
                style="stroke-dasharray: 300px, 300px; stroke-dashoffset: 0px"
            ></path>
            <path
                class="el-progress-circle__path"
                d="
            M 50 50
            m 0 -47
            a 47 47 0 1 1 0 94
            a 47 47 0 1 1 0 -94
            "
                :class="'ls-progress-circle-' + type"
                :stroke-width="stroke"
                fill="none"
                :stroke-linecap="round ? 'round' : ''"
                :style="{
                    'stroke-dasharray': `${processIndex}px, 295.31px`,
                    'stroke-dashoffset': 0,
                    transition:
                        'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s',
                }"
            ></path>
        </svg>
        <div v-if="showValue" class="progress-text">
            {{ value > 100 ? 100 : value }}%
        </div>
    </div>
    <div v-else class="ls-progress-line">
        <div
            :class="['ls-progress', { round }]"
            :style="{ '--height': stroke + 'px' }"
        >
            <div
                :class="[
                    'ls-progress-item',
                    { round, ['ls-progress-' + type]: type },
                ]"
                :style="{ backgroundColor: color, width: value > 100 ? 100 : value + '%' }"
            >
                <div class="ls-progress-text-line" v-if="showValue && textInside">
                        {{ value > 100 ? 100 : value }}%
                    </div>
            </div>
        </div>
        <div class="ls-progress-text" v-if="showValue && !textInside">
            {{ value > 100 ? 100 : value }}%
        </div>
    </div>
</template>
<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: "LsProgress",
    props: {
        type: String,
        buttonName: String,
        loading: Boolean,
        circle: {
            type: Boolean,
            default: false,
        },
        showValue: {
            type: Boolean,
            default: false,
        },
        round: {
            type: Boolean,
            default: false,
        },
        stroke: {
            type: String,
            default: "6",
        },
        color: {
            type: String,
            default: "#FF0000",
        },
        value: {
            type: Number,
            default: 0,
        },
        textInside: {
            type: Boolean,
            default: false,
        },
    },
    setup(prop) {
        const max = 298;
        let processIndex = computed(() => {
            if (prop.value >= 100) return max;
            return Math.floor(max * (prop.value / 100));
        });
        return {
            processIndex,
        };
    },
});
</script>
<style lang="scss" scoped>
@import "../theme-style/progress";
</style>

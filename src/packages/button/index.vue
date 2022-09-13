<template>
    <button
        :class="[
            'ls-button',
            `ls-button--${type}`,
            `ls-button-${size}`,
            {
                round,
                disabled: disabled || loading,
                'icon-btn': !isButton,
                'icon-round': iconRound,
            },
        ]"
        @click.stop="buttonClick"
        :disabled="disabled"
    >
        <ls-icon-loading v-if="loading" class="loading"></ls-icon-loading>
        <component
            v-if="icon && position === 'left'"
            class="icon"
            :color="iconColor"
            :is="icon"
        />
        <span v-if="isButton" class="ls-btn-name"><slot></slot></span>
        <component
            v-if="icon && position === 'right'"
            class="icon"
            :color="iconColor"
            :is="icon"
        />
    </button>
</template>
<script>
import { computed, defineComponent, getCurrentInstance } from "vue";
export default defineComponent({
    name: "LsButton",
    props: {
        type: {
            type: String,
            default: "default",
        },
        loading: Boolean,
        iconRound: Boolean,
        round: Boolean,
        size: {
            type: String,
            default: 'mini'
        },
        iconColor: {
            type: String,
            default: "",
        },
        icon: String,
        disabled: [Number, Boolean],
        position: {
            type: String,
            default: "left",
        },
    },
    setup(prop, { emit }) {
        const { proxy } = getCurrentInstance();
        const isButton = proxy?.$slots?.default?.()?.[0];
        const buttonClick = () => {
            if (prop.loading || prop.disabled) return;
            emit("buttonClick");
        };
        return {
            buttonClick,
            isButton,
        };
    },
});
</script>
<style lang="scss" scoped>
@import "../theme-style/button";
</style>

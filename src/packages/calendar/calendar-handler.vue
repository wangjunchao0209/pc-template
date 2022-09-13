<template>
    <div class="ls-calendar-handle">
        <div>
            <ls-icon-left-darrow
                class="arrow"
                @click="prevDouble"
            ></ls-icon-left-darrow>
            <ls-icon-left-arrow
                class="arrow"
                @click="prev"
            ></ls-icon-left-arrow>
        </div>
        <div class="current-year">
            <slot></slot>
        </div>
        <div>
            <ls-icon-right-arrow
                class="arrow"
                @click="next"
            ></ls-icon-right-arrow>
            <ls-icon-right-darrow
                class="arrow"
                @click="nextDouble"
            ></ls-icon-right-darrow>
        </div>
    </div>
</template>
<script>
import { defineComponent, computed, reactive, ref } from "vue";
export default defineComponent({
    setup(prop, { emit }) {
        const prev = () => {
            emit("prev");
        };
        const next = () => {
            emit("next");
        };
        const prevDouble = () => {
            emit("prevDouble");
        };
        const nextDouble = () => {
            emit("nextDouble");
        };
        return {
            prev,
            next,
            prevDouble,
            nextDouble,
        };
    },
});
</script>
<style lang="scss" scoped>
.ls-calendar-handle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e9e9e9;
    padding: 10px 15px;
    .arrow {
        width: 13px;
        margin: 0 5px;
        cursor: pointer;
        &:hover {
            &:deep path {
                fill: $mainColor;
            }
        }
    }
    .current-year {
        color: #334458;
    }
}
</style>

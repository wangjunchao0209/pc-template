<template>
    <div class="step">
        <span v-for="(item, index) in headList" :key="index" class="progress">
            <span class="title">
                <span :class="['index', { current: currentStepIndex > index }]">{{
                    item.id
                }}</span>
                <span class="name">{{ item.name }}</span>
            </span>
            <hr
                :class="{ current: currentStepIndex - 1 > index }"
                v-if="index < headList.length - 1"
            />
        </span>
    </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "LsStep",
    props: {
        headList: Array,
        // [{name: 1, id: 1}]
        currentStepIndex: Number
    }
})
</script>
<style lang="scss" scoped>
@import "../theme-style/step";
</style>
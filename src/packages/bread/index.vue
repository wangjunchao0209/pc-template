<template>
    <div class="bread">
        <div v-for="(item, index) in breadList" :key="item.menuId">
            <span :class="{ notice: index === breadList.length - 1 }"
                >{{ item.title }} </span
            ><span v-show="index < breadList.length - 1" class="space">
                {{ spacer }}
            </span>
        </div>
    </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "LsBread",
    props: {
        spacer: {
            type: String,
            default: "/",
        },
        breadList: Array,
    },
    setup() {},
});
</script>
<style lang="scss" scoped>
@import "../theme-style/bread";
</style>

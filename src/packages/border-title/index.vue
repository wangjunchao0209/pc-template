<template>
    <!-- 模块标题 左侧带菱形竖线 -->
    <div class="title">
        <slot></slot>
    </div>
</template>
<script>
import {
    defineComponent,
} from "vue";
export default defineComponent({
    name: 'LsBorderTitle',
    props: {
        title: String,
    },
})
</script>
<style lang="scss" scoped>
    @import "../theme-style/border-title";
</style>

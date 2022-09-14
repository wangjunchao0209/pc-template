<template>
    <div class="main-module">
        <slot></slot>
    </div>
</template>
<script>
import {
    defineComponent,
} from "vue";
export default defineComponent({
    name: 'LsMainModule',
});
</script>

<style lang="scss" scoped>
@import "../theme-style/main-module";
</style>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" data-v-152cbb9b="">
        <path :style="{fill: color}" class="st" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path>
    </svg>
</template>
<script>
export default {
    name: "LsIconPlus",
    props: {
        color: {
            type: String,
            default: ''
        }
    }
};
</script>
<style lang="scss" scoped>
    path {
        fill: $navIconDefaultColor;
    }
</style>
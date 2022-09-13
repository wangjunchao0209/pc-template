<template>
    <svg
        class="icon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-365b8594=""
    >
        <path
            d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"
        ></path>
        <path
            d="M480 256a32 32 0 0132 32v256a32 32 0 01-64 0V288a32 32 0 0132-32z"
        ></path>
        <path d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"></path>
    </svg>
</template>
<script>
export default {
    name: "LsIconClock",
};
</script>
<style lang="scss" scoped>
path {
    fill: $navIconDefaultColor;
}
</style>

<template>
    <router-view />
</template>
<script>
import { defineComponent, getCurrentInstance } from "vue";
import qs from "qs";
import { useStore } from "vuex";
export default defineComponent({
    setup() {
        const store = useStore();
        window.componentSize = "mini";
        const href = location.search || location.hash;
        const i = href.indexOf("?");
        const search = href.substr(i + 1);
        const query = qs.parse(search);
        const { code, toonType, OCM_USER_TOKEN } = query;
        if (code && toonType) {
            store.commit("setToonType", toonType);
            store.dispatch("loginFn", code);
            sessionStorage["env"] = "zg";
        } else if (OCM_USER_TOKEN) {
            store.dispatch("loginYFn", OCM_USER_TOKEN);
            sessionStorage["env"] = "yg";
        } else {
            const { proxy } = getCurrentInstance();
            proxy.$lsmessage({
                text: "无法获取有效身份信息，请联系管理员",
                type: "error",
            });
        }
    },
});
</script>
<style lang="scss">
#app {
    width: 100%;
    height: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
</style>

import { createStore } from "vuex";
import { login, getToonTypeYG } from "@/service";
import Notice from "../packages/message/mountMessage";
export default createStore({
    state: {
        token: "",
        toonType: "",
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getToonType(state) {
            return state.toonType;
        },
    },
    mutations: {
        setToken(state, value) {
            state.token = value;
        },
        setToonType(state, value) {
            console.log(value, 990);
            state.toonType = value;
        },
    },
    actions: {
        async loginFn({ commit }, code) {
            const res = await login({ code });
            if (res.code === 0) {
                const { data } = res;
                sessionStorage["gray-token"] = data;
                commit("setToken", data);
            } else {
                Notice({
                    text: "获取用户信息失败",
                    type: "error",
                });
            }
        },
        async loginYFn({ commit }, ocmToken) {
            const res = await getToonTypeYG({ ocmToken });
            const { data, meta } = res;
            if (meta.code === 0) {
                commit("setToonType", data.toonType);
                commit("setToken", ocmToken);
                sessionStorage["gray-token"] = ocmToken;
            } else {
                Notice({
                    text: meta.message,
                    type: "error",
                });
            }
        },
    },
});

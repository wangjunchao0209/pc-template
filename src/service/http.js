import axios from "axios";
import Notice from "../packages/message/mountMessage";
const isDev = process.env.NODE_ENV === "development";
const addHeader = () => {
    const authorization = sessionStorage["gray-token"];
    const name = sessionStorage["env"] === "zg" ? "authorization" : "ocmtoken";
    return {
        [name]: authorization,
    };
};
export const post = (url, param = {}, opt = {}) => {
    return axios.post(url, param, { headers: addHeader(), ...opt });
};
export const get = (url, params = {}, opt = {}) => {
    let headers = addHeader();
    return axios.get(url, { params, headers, ...opt });
};

export const formatUrl = path => {
    return isDev ? path : "/opmp-manage" + path;
    // return path
};
// 响应拦截器
axios.interceptors.request.use(
    data => {
        return data;
    },
    () => {
        Notice({
            text: "服务调用失败或接口错误",
            type: "error",
        });
    }
);
// 响应拦截器
axios.interceptors.response.use(
    data => data,
    err => {
        Notice({
            text: `服务响应失败，状态码${err.response.status}`,
            type: "error",
        });
    }
);

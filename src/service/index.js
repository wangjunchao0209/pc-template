import { get, post, formatUrl } from "./http.js";

/*
 ** 综管login认证
 */
export const login = async param => {
    const url = formatUrl("/app-config-extra/login");
    const res = await get(url, param);
    return res.data;
};
/*
 *  运管获取toontype
 */
export const getToonTypeYG = async param => {
    const url = formatUrl("/manager/toon/ocmToonInfo");
    const res = await get(url, param);
    return res.data;
};

export const test = async param => {
    const url = formatUrl("/sss");
    const res = await post(url, param);
    return res.data;
};

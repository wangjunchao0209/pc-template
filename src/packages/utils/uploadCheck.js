import Notice from "../message/mountMessage";
const sizeImg = {
    K: 1,
    M: 2,
    G: 3,
};

export const getType = (currentType, accept, name) => {
    const arr = accept.split(",").map(d => d.trim());
    if (accept.includes("/")) {
        return arr.includes(currentType);
    } else {
        const h = name.split(".")[1];
        return arr.includes(h);
    }
};

export const getSize = (fileSize, range, unit) => {
    if (typeof range !== "number" && isNaN(range)) {
        Notice({ text: "不合法的尺寸限制", type: "warning" });
        return false;
    } else if (typeof range === "number" && unit) {
        const size = 1024 ** sizeImg[unit];
        const isLt2M = fileSize / size < range;
        if (!isLt2M) {
            Notice({ text: `仅支持${range}${unit}以内`, type: "warning" });
            return false;
        }
        return true;
    }
    return false;
};

export const getImgSize = (size, url) => {
    return new Promise((resolve, reject)=> {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            const { width, height } = img;
            const [hopeWidth, hopeHeight] = size;
            if (width !== hopeWidth || height !== hopeHeight) {
                Notice({
                    text: `请上传尺寸为${size.join(" X ")}的图片`,
                    type: "warning",
                });
                reject()
            }
            resolve()
        };
    })
};
export const getFormData = y => {
    const fd = new FormData();
    Object.keys(y).forEach(k => fd.append(k, y[k]));
    return fd;
};
const subName = file => {
    const i = file.lastIndexOf("/");
    const n = file.substr(i + 1);
    return n;
};
export const getFileName = v => {
    let arr = [];
    if (v instanceof Array) {
        arr = v.map(g => subName(g));
    } else if (typeof v === "string") {
        arr = v.split(",").map(g => subName(g));
    } else {
        throw new Error("上传文件组件仅支持String，Array类型的值");
    }
    return arr;
};

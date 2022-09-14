/* 
* 时间格式化  format('yyyy-MM-dd hh:mm:ss', new Date(date))
* @param String
* @param Date
* return String
*/
export const format = (fmt, date) => {
    const o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
        );
    }

    Object.keys(o).forEach(k => {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? o[k]
                    : `00${o[k]}`.substr(`${o[k]}`.length)
            );
        }
    });
    return fmt;
};
/* 
* 删除空项
* @param Object
* return Object
*/
export const delNullString = obj => {
    const keys = Object.keys(obj);
    keys.forEach(b => {
        if (obj[b] === "" || obj[b] === null || obj[b] === undefined) {
            delete obj[b];
        }
    });
    return obj;
};

const judgeType = obj => {
    const toString = Object.prototype.toString;
    const map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object",
    };
    if (obj instanceof Element) {
        return "element";
    }
    return map[toString.call(obj)];
};
/* 
* 深拷贝
* @param Object Array
* return Object Array
*/
export const arrayClone = data => {
    const type = judgeType(data);
    let obj = null;
    if (type === "array") {
        obj = [];
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(arrayClone(data[i]));
        }
    } else if (type === "object") {
        obj = {};
        for (const key in data) {
            obj[key] = arrayClone(data[key]);
        }
    } else {
        return data;
    }
    return obj;
};

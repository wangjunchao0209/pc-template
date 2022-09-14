import { format } from '@/utils/tool.js'
// 列表配置
export const appTable = [
    {
        name: '应用名称',   // 表头名称
        prop: 'appName',   // 表内数据 属性名
        func(data, prop) { // 表内数据 格式化方法
            return data[prop]
        },
        width: '100px', // 表宽度
        id: 7, // 表key
        overflow: true  // 内容过长 。。。显示
    },
    {
        name: '应用标识',
        prop: 'appStatus',
        func(data, prop) {
            return data[prop]
        },
        width: '100px',
        id: 1,
    },
    {
        name: 'APPID',
        prop: 'appId',
        func(data, prop) {
            return data[prop]
        },
        width: '100px',
        id: 2,
        overflow: true
    },
    {
        name: '操作人',
        prop: 'operatorId',
        func(data, prop) {
            return data[prop]
        },
        width: '100px',
        id: 3,
    },
    {
        name: '更新时间',
        prop: 'updateTime',
        func(data, prop) {
            return format('yyyy-MM-dd hh:mm:ss', new Date(data[prop]))
        },
        width: '80px',
        id: 6,
    },
]

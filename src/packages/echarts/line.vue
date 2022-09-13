<template>
    <div class="e-line" ref="mbGraph"></div>
</template>
<script setup>
/**
 * @param {object} param.grid - 折线图position - {top bottom left right}
 * @param {object} param.yArea - y轴配置
*                   name: "测试",  // string  y轴名称
                    yLine: {   // y轴刻度线配置
                        show: true, // 是否显示
                        lineColor: "blue",  // 刻度线颜色
                        width: 2 // 刻度线宽度
                    },
                    rulerLineShow: { // y轴对应标尺线
                        show: true, // 是否显示
                        color: "red", // 标尺线颜色
                        opacity: 0.3 //标尺线透明度
                    },
                    nameStyle: { //y轴名称配置
                        location: "end", // 名称在y轴位置  -- start  center  end
                        color: "yellow", // 名称颜色
                        fontSize: 12, // 名称字号
                        lineHeight: 0.4 // 名称行高
                    },
                    labelStyle: { // y轴刻度值配置
                        color: "red", // y轴刻度值颜色
                        fontSize: 10 // y轴刻度值字号
                    }
 * @param {boolean} param.xArea - x轴配置
                    name: "测试", // string  x轴名称
                    nameGap: 12, //名称与轴线间距
                    hasGap: false,  // boolean x轴是否坐标轴两边留白
                    xLine: { // x轴线
                        show: true, // x轴线是否显示
                        lineColor: "red", // x轴线颜色
                        width: 2 // number x轴线宽度
                    },
                    rulerLineShow: {  // x轴线标尺线
                        show: false, /// x轴线标尺线是否显示
                        color: "red", // x轴线标尺线颜色
                        opacity: 0.3 // number x轴线标尺线透明度
                    },
                    nameStyle: { // x轴线名称样式
                        location: "end", // x轴线名称位置
                        color: "yellow", // x轴线名称颜色
                        fontSize: 12, // number x轴线名称字号
                        lineHeight: 0.4 // number x轴线名称行高
                    },
                    labelStyle: { // x轴线刻度
                        show: false,
                        color: "red", // x轴线刻度颜色
                        fontSize: 10 // x轴线刻度字号
                    },
                    data: lines.time // array<string> x轴线名称列表
 * @param {object} param.legendStyle - 图例
                    show: true,  // 是否显示图例
                    // false 以下可省略
                    width: '100%' || 500, // 如果是number单位是px
                    icon: "rect",  // 图例类型 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                    itemWidth: 15, // 图例宽度
                    itemHeight: 8, // 图例高度
                    right: "center", // 图例位置
                    select: 0, // 默认选中0
                    textStyle: { // 图例文字样式
                        fontSize: 13, // 图例文字字号
                        color: "white" // 图例文字颜色
                    }
* @param {function} param.formatFn - 浮层数据格式化
* @param {object} param.dataLine - 折线数据
                    areaColor: [   // 折线底部渐变 最多支持3种颜色 二维数组 几条线对应几项  每项最多支持3种颜色 如果list中单项值为字符串则不渐变 底部颜色为设置值
                        ["green", "transparent"],
                        ["red", "transparent"]
                    ],
                    // areaColor: ['red'],
                    color: [  // 折线渐变 最多支持3种颜色 二维数组 几条线对应几项  每项最多支持3种颜色 如果list中单项值为字符串则不渐变 颜色为设置值
                        ["red", "#1884fe"],
                        ["#1884fd", "#1884fe"]
                    ],
                    // color: ["blue"],
                    width: [2], // 每条折线宽度 数组长度1 全部折线宽度  多项则折线对应宽度
                    smooth: true, // 是否圆滑
                    data: [  // 折线数据 array<number / string>
                        lines.data,
                        [...lines.data].map(f => Number(f) * Math.random())
                    ],
                    symbol: {
                        showAllSymbol： false,  //是否直接显示坐标点
                        symbolSize: 4,  // 折线图上出现点视图大小
                        symbol: 'circle', // 折线图上出现点视图类型   'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                        showText: true,  //是否显示坐标点数据
                        // false 以下可不选
                        color: "#fff",  //坐标点数据颜色
                        fontSize: 12,  //坐标点数据字号
                    }
 */
import * as echarts from "echarts";
import {
    defineProps,
    defineExpose,
    nextTick,
    onMounted,
    ref,
    watch,
} from "vue";
const prop = defineProps({
    param: Object,
});
let graph = null;
const mbGraph = ref(null);
let option = null;
const textFormatFn = s => {
    if (s >= 10000) {
        return s / 10000 + "W";
    } else if (s >= 1000) {
        return s / 1000 + "K";
    }
    return s;
};
const xAxis = xArea => {
    let xAxis = {
        name: xArea?.name,
        nameLocation: xArea?.nameStyle?.location || "end",
        type: "category",
        boundaryGap: xArea?.hasGap || false,
        axisLine: {
            show: xArea?.xLine?.show,
            lineStyle: {
                color: xArea?.xLine?.lineColor,
                width: xArea?.xLine?.width || 2,
            },
        },
        nameGap: xArea?.nameGap || 5,
        nameTextStyle: {
            color: "white",
            fontSize: 10,
            lineHeight: 0.4,
            ...xArea?.nameStyle,
        },
        axisLabel: {
            show: xArea?.labelStyle?.show,
            color: xArea?.labelStyle?.color || "#ccc",
            textStyle: {
                fontSize: xArea?.labelStyle?.fontSize || 10,
            },
        },
        splitLine: {
            show: xArea?.rulerLineShow?.show,
            lineStyle: {
                color: xArea?.rulerLineShow?.color || "#ccc",
                opacity: xArea?.rulerLineShow?.opacity || 0.3,
                type: xArea?.rulerLineShow?.type
            },
        },
        data: xArea.data,
    };
    return xAxis;
};
const yAxis = yArea => {
    let yAxis = {
        name: yArea?.name || "",
        nameLocation: yArea?.nameStyle?.location || "end",
        nameTextStyle: {
            color: "white",
            fontSize: 10,
            lineHeight: 0.4,
            ...yArea?.nameStyle,
        },
        type: "value",
         axisTick: {
            show: false
        },
        axisLine: {
            show: yArea?.yLine?.show,
            lineStyle: {
                color: yArea?.yLine?.lineColor,
                width: yArea?.yLine?.width,
                opacity: yArea?.yLine?.opacity,
            },
        },
        splitLine: {
            show: yArea?.rulerLineShow?.show,
            lineStyle: {
                color: yArea?.rulerLineShow?.color || "#ccc",
                opacity: yArea?.rulerLineShow?.opacity || 0.3,
                type: yArea?.rulerLineShow?.type
            },
        },
        axisLabel: {
            color: yArea?.labelStyle?.color || "#ccc",
            textStyle: {
                fontSize: yArea?.labelStyle?.fontSize || 10,
            },
            formatter: yArea?.labelStyle?.formatterFn || textFormatFn,
        },
    };
    return yAxis;
};
const colorD = (s, m) => {
    if (m === "l-r") {
        return new echarts.graphic.LinearGradient(0, 1, 1, 0, s);
    } else {
        return new echarts.graphic.LinearGradient(0, 0, 0, 1, s);
    }
};
const setColor = (colors, positon, kind) => {
    const { dataLine, xArea } = prop.param;
    const { useSplitColor, splitMonth } = dataLine;
    let lColor = "";
    if (colors) {
        if (colors instanceof Array) {
            const m = colors.map((g, i) => {
                let n = colors.length;
                let m = 0;
                if (i === 0) m = 0;
                else if (i === n - 1) m = 1;
                else m = (n - 2) / 2;
                return {
                    offset: m,
                    color: g,
                };
            });
            lColor = colorD(m, positon);
            if (useSplitColor && kind === "line") {
                const { data } = xAxis(xArea);
                const q = 1 / (data.length - 1);
                const dfloat = data.map((v, i) => +(i * q).toFixed(2));
                const ik12 = data.findIndex(gf => +gf === splitMonth);
                const c = dfloat.map((b, bi) => {
                    if (bi <= ik12) {
                        return {
                            offset: b,
                            color: colors[0],
                        };
                    } else {
                        return {
                            offset: b,
                            color: colors[1],
                        };
                    }
                });
                lColor = new echarts.graphic.LinearGradient(0, 0, 0.9, 0.15, c);
            }
        } else {
            lColor = colors;
        }
    }
    return lColor;
};

const lines = param => {
    let { title } = prop.param;
    let { dataLine } = param;
    let p = [];
    const { color, areaColor, width, smooth, data, symbol } = dataLine;
    title.forEach((h, i) => {
        let tm = {
            name: h,
            type: "line",
            smooth,
            showAllSymbol: symbol?.showAllSymbol || false,
            color: setColor(color[i], "l-r"),
            lineStyle: {
                width: width[i],
                color: setColor(color[i], "l-r", "line"),
            },
            data: data[i],
        };
        if (areaColor) {
            tm.areaStyle = {
                color: setColor(areaColor[i], "t-b"),
            };
        }
        if (symbol) {
            tm = {
                ...tm,
                ...symbol,
            };
            tm.label = {
                show: symbol?.showText,
                // position: "top",
                color: setColor(color[i], "l-r"),
                fontSize: symbol?.fontSize || 10,
            };
        }
        p.push(tm);
    });
    return p;
};

const mouseFormatFn = name => {
    let str = "";
    str = `${name[0].name}<br />`;
    name.forEach(p => {
        str += `${p.marker}  ${p.seriesName}： ${p.value}<br />`;
    });
    return str;
};
const initGraph = option => {
    graph = echarts.init(mbGraph.value);
    graph.setOption(option);
};
const download = name => {
    const url = graph.getDataURL({
        backgroundColor: "#fff",
    });
    var a = document.createElement("a");
    a.href = url;
    a.download = name || "图表";
    document.body.appendChild(a);
    a.click();
    a.remove();
};
const renders = (datas, d, select) => {
    if (d) {
        let y = { legend: { selected: {} } };
        Object.keys(prop.param.title).forEach((p, i) => {
            if (i === select) {
                y.legend.selected[prop.param.title[i]] = true;
            } else {
                y.legend.selected[prop.param.title[i]] = false;
            }
        });
        graph.setOption(y);
        return;
    }
    let o = {
        xAxis: xAxis(datas.xArea),
        yAxis: yAxis(datas.yArea),
        series: lines(datas),
    };
    graph.setOption(o);
};

const drawLine = param => {
    let { grid, yArea, xArea, legendStyle, title, formatFn, toolbox } = param;
    grid = grid
        ? grid
        : {
              left: "0%",
              right: "8%",
              bottom: "5%",
              top: "8%",
              containLabel: true,
          };

    option = {
        xAxis: xAxis(xArea),
        yAxis: yAxis(yArea),
        legend: {
            icon: "rect",
            itemWidth: 15,
            itemHeight: 8,
            right: "center",
            textStyle: {
                fontSize: 13,
                color: "black",
            },
            ...legendStyle,
            data: title,
        },
        grid,
        tooltip: {
            trigger: "axis",
            formatter: formatFn || mouseFormatFn,
        },
        series: lines(prop.param),
    };
    if (Reflect.has(legendStyle, "select")) {
        option.legend.selected = {};
        Object.keys(title).forEach((p, i) => {
            if (i === legendStyle.select) {
                option.legend.selected[title[i]] = true;
            } else {
                option.legend.selected[title[i]] = false;
            }
        });

        Reflect.deleteProperty(legendStyle, "select");
    }
    if (toolbox) {
        option.toolbox = toolbox;
    }
    initGraph(option);
};
onMounted(() => {
    nextTick(() => {
        drawLine(prop.param);
    });
});
watch(
    () => prop.param,
    () => {
        renders(prop.param);
    }
);
defineExpose({
    download,
});
</script>
<style lang="scss" scoped>
.e-line {
    height: 100%;
    width: 100%;
}
</style>

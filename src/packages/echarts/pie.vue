<template>
    <div class="e-pie" ref="mbGraph"></div>
</template>
<script setup>
/**
*
* @param {object} param.legendStyle - 饼图图例
                itemWidth: 15, // 饼图图例宽度
                itemHeight: 8, // 饼图图例高度
                icon: "rect", // 饼图图例类型 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                right: 10, // 饼图图例类型右侧偏移量
                bottom: "center", // 饼图图例类型底部偏移量
                top: "center", // 饼图图例类型顶部偏移量
                textStyle: { // 饼图图例类型文本样式
                    fontSize: 13,
                    color: "#6e69b2"
                }
* @param {function} param.formatFn - 饼图浮层数据
* @param {function} param.labelFormatter - 饼图数据
* @param {object} param.dataPie - 饼图数据配置
                type: {  // 饼图数据项配置
                    text: "测试数据", // 饼图数据项居中显示的文字
                    fontSize: 12,  // 饼图数据项居中显示的文字字号
                    textColor: "white", // 饼图数据项居中显示的文字颜色
                    // selectedMode: "single"  // 点击饼图某项是否有偏移量
                    // color: "red",  // 饼图色块
                    color: ["red", "purple", "green"], // 饼图色块 数组为每块颜色
                    radius: [50, 110], // 饼图内圆半径 和 外圆半径
                    roseType: "area" // 配置此项则为玫瑰图
                    center: ['50%', '50%'],  // 容器x轴坐标-left 容器y轴坐标-top
                },
                labelLine: {  //延长线配置
                    line1: 5,  第一条拐角延长线
                    line2: 5,  第二条延长线
                    smooth: false 是否圆滑
                },
                data: [  // 饼图数据
                    { value: 100, name: "百度" },
                    { value: 400, name: "腾讯" },
                    { value: 333, name: "阿里" }
                ]
*/
import echarts from "echarts";
import { defineProps, defineExpose, nextTick, onMounted, ref } from "vue";
const props = defineProps({
    param: Object,
});

const mbGraph = ref(null);
let graph = ref(null);
let option = null;

const pies = datas => {
    let u = [];
    let param = {
        avoidLabelOverlap: true,
        type: "pie",
        center: ["50%", "50%"],
        labelLine: {
            length: datas?.labelLine?.line1 || 10,
            length2: datas?.labelLine?.line2 || 20,
            smooth: datas?.labelLine?.smooth,
        },
    };
    let { data, type } = datas;
    if (type) {
        param = {
            ...param,
            ...type,
        };
        if (type.selectedMode) {
            data.forEach(p => {
                p.selectedMode = type.selectedMode;
            });
        }
    }
    param.data = data;
    u.push(param);
    return u;
};
const mouseFormatFn = name => {
    let str = "";
    str += `${name.marker}  ${name.name}： ${name.value}`;
    return str;
};
const initGraph = option => {
    graph.value = echarts.init(mbGraph.value);
    graph.value.setOption(option);
};
const download = () => {
    return graph.value.getDataURL();
};
const renders = datas => {
    graph.value.setOption({
        series: pies(datas),
    });
};
const labelFormattes = s => {
    return s.name + " " + s.percent + "%";
};
const drawLine = param => {
    let { grid, legendStyle, formatFn, dataPie, labelStyle } = param;
    grid = grid
        ? grid
        : {
              left: '0%',
              right: 60,
              bottom: 20,
              top: "15%",
              containLabel: false,
          };
    let option = {
        legend: {
            orient: "vertical",
            itemWidth: 15,
            itemHeight: 8,
            textStyle: {
                fontSize: 13,
                color: "#6e69b2",
            },
            ...legendStyle,
            data: dataPie?.data?.map(g => g.name),
        },
        label: {
            formatter: m => {
                if (labelStyle?.bleedMargin) {
                    // 超过出血线的文字将被裁  <number>
                    const y = labelStyle.labelFormatter(m);
                    if (y.length > labelStyle.bleedMargin) {
                        return y.slice(0, labelStyle.bleedMargin) + "...";
                    } else {
                        return y;
                    }
                } else {
                    if (labelStyle?.labelFormatter(m)) {
                        return labelStyle?.labelFormatter(m);
                    } else {
                        return labelFormattes(m);
                    }
                }
            },
            fontSize: labelStyle?.fontSize || 13,
            fontWeight: labelStyle?.fontWeight || "bold",
            lineHeight: 17
        },
        grid,
        tooltip: {
            trigger: "item",
            formatter: formatFn || mouseFormatFn,
        },
        series: pies(dataPie),
    };
    if (dataPie.type) {
        option.title = {
            text: dataPie?.type?.text,
            top: "center",
            textAlign: "center",
            left: "50%",
            textStyle: {
                fontSize: dataPie?.type?.fontSize || 18,
                color: dataPie?.type?.textColor || "#334458",
                fontWeight: "bold",
            },
        };
        let nn = 4;
        if (dataPie.type.text) {
            const reg = new RegExp(/\n/g);
            const ys = dataPie.type.text.match(reg);
            if (ys && ys.length === 1) nn = 7;
            else if (ys && ys.length === 2) nn = 11;
        }
        if (dataPie?.type?.center) {
            const centers = dataPie.type.center.map(g => +g.slice(0, -1));
            option.title.left = centers[0] - 1 + "%";
            option.title.top =
                centers[1] - nn - (dataPie.type.fontSize - 12) / 5 + "%";
        }
    }
    initGraph(option);
};
onMounted(() => {
    nextTick(() => {
        drawLine(props.param);
    });
});
defineExpose({ renders });
</script>
<style lang="scss" scoped>
.e-pie {
    height: 100%;
    width: 100%;
}
</style>

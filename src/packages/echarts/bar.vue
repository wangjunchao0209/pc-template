<template>
    <div class="e-line" ref="mbGraph"></div>
</template>
<script>
export default {
    name: "LsBar"
}
</script>
<script setup>
import echarts from "echarts";
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
    }
    return s;
};
let { grid, yArea, xArea, legendStyle, title, formatFn, toolbox } = prop.param;
const xAxis = xArea => {
    let xAxis = {
        name: xArea?.name,
        type: prop.param.pos === "hor" ? "category" : "value",
        show: xArea?.xLine?.show,
        axisLine: {
            show: xArea?.axisLine?.show,
            lineStyle: {
                color: xArea?.xLine?.lineColor,
                width: xArea?.xLine?.width || 2,
                opacity: xArea?.rulerLineShow?.opacity || 0.3,
            },
        },
        axisTick: {
            show: xArea?.axisTick?.show,
        },
        axisLabel: {
            ...xArea.axisLabel
        },
        nameTextStyle: {
            color: "white",
            fontSize: 10,
            lineHeight: 0.4,
            ...xArea?.nameStyle,
        },
        splitLine: {
            show: xArea?.rulerLineShow?.show,
            lineStyle: {
                color: xArea?.rulerLineShow?.color || "#324558",
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
        type: prop.param.pos === "hor" ? "value" : "category",
        // axisTick: true,
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
                color: yArea?.rulerLineShow?.color || "#324558",
                opacity: yArea?.rulerLineShow?.opacity || 0.3,
                type: yArea?.rulerLineShow?.type
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            formatter: yArea?.labelStyle?.formatterFn || textFormatFn,
        },
    };
    if (prop.param.pos !== "hor") {
        yAxis = Object.assign(yAxis, {
            data: xArea.data,
        });
    }
    let mk = [yAxis]
    if (prop.param.pos === 'ver') {
        mk.push(prop.param.sYdata)
        console.log(prop.param);
    }
    return mk;
};
const colorD = (s, m) => {
    return new echarts.graphic.LinearGradient(0, 1, 1, 0, s);
};
const setColor = (colors, positon) => {
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
        } else {
            lColor = colors;
        }
    }
    return lColor;
};

const bars = param => {
    let { title } = prop.param;
    let { dataLine } = param;
    let p = [];
    const { color, areaColor, width, data } = dataLine;
    title.forEach((h, i) => {
        let tm = {
            name: h,
            type: "bar",
            color: setColor(color[i]),
            barWidth: width[i],
            data: data[i],
        };
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
const renders = datas => {
    let o = {
        xAxis: xAxis(datas.xArea),
        yAxis: yAxis(datas.yArea),
        series: bars(datas),
    };
    graph.setOption(o);
};

const drawLine = () => {
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
        series: bars(prop.param),
    };
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

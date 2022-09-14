<template>
    <div class="is-map">
        <div class="back" v-show="showDesc">※双击地图返回※</div>
        <div class="e-line" ref="mbGraph"></div>
    </div>
</template>
<script setup>
import echarts from "echarts";
import {
    defineProps,
    defineExpose,
    nextTick,
    onMounted,
    ref,
    watch,
    getCurrentInstance,
} from "vue";
import "echarts/map/js/china.js";
const china = require("echarts/map/json/china.json");
const prop = defineProps({
    param: Object,
});
let showDesc = ref(false)
let graph = null;
const mbGraph = ref(null);
let option = null;
const { proxy } = getCurrentInstance();
let timeS = 0;

const initGraph = option => {
    graph.setOption(option);
};
const download = name => {
    const url = graph.getDataURL();
    var a = document.createElement("a");
    a.href = url;
    a.download = name || "图表";
    document.body.appendChild(a);
    a.click();
    a.remove();
};
const renders = datas => {
    let o = {
        series: bars(datas),
    };
    graph.setOption(o);
};
let allData = [];
let province = {
    北京: require("echarts/map/json/province/beijing.json"),
    天津: require("echarts/map/json/province/tianjin.json"),
    上海: require("echarts/map/json/province/shanghai.json"),
    重庆: require("echarts/map/json/province/chongqing.json"),
    河北: require("echarts/map/json/province/hebei.json"),
    河南: require("echarts/map/json/province/henan.json"),
    云南: require("echarts/map/json/province/yunnan.json"),
    辽宁: require("echarts/map/json/province/liaoning.json"),
    黑龙江: require("echarts/map/json/province/heilongjiang.json"),
    湖南: require("echarts/map/json/province/hunan.json"),
    安徽: require("echarts/map/json/province/anhui.json"),
    山东: require("echarts/map/json/province/shandong.json"),
    新疆: require("echarts/map/json/province/xinjiang.json"),
    江苏: require("echarts/map/json/province/jiangsu.json"),
    浙江: require("echarts/map/json/province/zhejiang.json"),
    江西: require("echarts/map/json/province/jiangxi.json"),
    湖北: require("echarts/map/json/province/hubei.json"),
    广西: require("echarts/map/json/province/guangxi.json"),
    甘肃: require("echarts/map/json/province/gansu.json"),
    山西: require("echarts/map/json/province/shanxi1.json"),
    内蒙古: require("echarts/map/json/province/neimenggu.json"),
    陕西: require("echarts/map/json/province/shanxi.json"),
    吉林: require("echarts/map/json/province/jilin.json"),
    福建: require("echarts/map/json/province/fujian.json"),
    贵州: require("echarts/map/json/province/guizhou.json"),
    广东: require("echarts/map/json/province/guangdong.json"),
    青海: require("echarts/map/json/province/qinghai.json"),
    西藏: require("echarts/map/json/province/xizang.json"),
    四川: require("echarts/map/json/province/sichuan.json"),
    宁夏: require("echarts/map/json/province/ningxia.json"),
    海南: require("echarts/map/json/province/hainan.json"),
    台湾: require("echarts/map/json/province/taiwan.json"),
    香港: require("echarts/map/json/province/xianggang.json"),
    澳门: require("echarts/map/json/province/aomen.json"),
};
const drawLine = async (data, propName, name = "china") => {
    showDesc.value = propName === 'title'
    allData = data.features.map(f => {
        let pa = {
            name: f.properties.name,
            value: 0,
        };
        return pa;
    });
    prop.param?.forEach(pa => {
        const dd = allData.find(m => pa[propName] === m.name);
        if (dd) {
            dd.value += pa.number;
        }
    });

    echarts.registerMap(name, data);
    option = {
        tooltip: {
            show: true,
            formatter: function (params) {
                if (params.data)
                    return params.name + "：" + params.data["value"];
            },
        },
        visualMap: {
            type: "continuous",
            show: false,
            text: ["", ""],
            showLabel: true,
            left: "50",
            min: 0,
            max: 100,
            inRange: {
                color: [
                    "#f7f7f7",
                    "#3998a7",
                    "#215096",
                    "#1755b2",
                    "#115fd5",
                    "#39269c",
                ],
            },
            splitNumber: 0,
        },
        series: [
            {
                name: "MAP",
                type: "map",
                mapType: name,
                zoom: 1.2,
                selectedMode: "false", //是否允许选中多个区域
                label: {
                    normal: {
                        show: true,
                    },
                    emphasis: {
                        show: true,
                    },
                },
                data: allData,
            },
        ],
    };
    initGraph(option);
};
const initEvent = () => {
    graph.on("click", params => {
        clearTimeout(timeS);
        //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
        timeS = setTimeout(function () {
            const { name } = params; //地区name
            const mapCode = province[name]; //地区的json数据
            if (!mapCode) {
                return;
            }
            drawLine(mapCode, "title", name);
        }, 250);
    });
    graph.on("dblclick", param => {
        clearTimeout(timeS);
        drawLine(china, "provinceName");
    });
};
onMounted(() => {
    nextTick(() => {
        graph = echarts.init(mbGraph.value);
        drawLine(china, "provinceName");
        initEvent();
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
.is-map {
    height: 100%;
    width: 100%;
    position: relative;
    .e-line {
         height: 100%;
        width: 100%;
    }
    .back {
        font-size: 13px;
        color: #888;
        position: absolute;
        right: 30px;
        top: 10px;
    }
}
</style>

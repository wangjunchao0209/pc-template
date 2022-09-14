<template>
    <div class="tabs">
        <strong
            v-for="(item, index) in tabList"
            :ref="`tabItem${index}`"
            :key="index"
            :class="['tab-item', { actived: chooseIt === index && isSignle }]"
            @click="tab(item, index)"
        >
            {{ item.label }}
        </strong>
        <span class="under" v-if="isSignle" :style="hrPos"></span>
    </div>
</template>
<script>
export default {
    name: "LsTabs",
};
</script>
<script setup>
import {
    defineProps,
    defineEmits,
    computed,
    onMounted,
    ref,
    getCurrentInstance,
} from "vue";
const props = defineProps({
    tabList: {
        type: Array,
        default: () => [],
    },
    signleUnshow: {
        type: Boolean,
        default: false,
    },
});
const { proxy } = getCurrentInstance();
const emit = defineEmits(["change"]);
const chooseIt = ref(0);
const left = ref("0px");
const width = ref("0px");
let refAll = null;
const isSignle = computed(
    () => props.tabList.length > 1 || !props.signleUnshow
);
const hrPos = computed(() => ({
    left: left.value,
    width: width.value,
}));
const getHrSize = (text, index) => {
    const refChild = refAll[`tabItem${index}`];
    left.value = refChild.offsetLeft + "px";
    width.value = text.length * 15 + "px";
};
const tab = (item, index) => {
    getHrSize(item.label, index);
    chooseIt.value = index;
    emit("change", {
        currentTab: item,
        currentIndex: index,
    });
};
onMounted(() => {
    refAll = proxy._.refs;
    const [text] = props.tabList;
    getHrSize(text.label, 0);
});
</script>
<style lang="scss" scoped>
@import "../theme-style/tabs";
</style>

<template>
    <ls-button
        v-for="item in showBtnList"
        :key="item.label"
        type="text"
        @buttonClick="bclick(item)"
        >{{ item.label }}</ls-button
    >
    <div class="pop-overflow" v-show="overflowBtnList.length > 0">
        <div
            :class="[
                'pop-list',
                { up: current > index, down: current <= index },
            ]"
        >
            <div class="pop-list-flex">
                <div
                    v-for="itemS in overflowBtnList"
                    :key="itemS.label"
                    @click="bclick(itemS)"
                >
                    {{ itemS.label }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, computed, ref, watch, onMounted } from "vue";
export default defineComponent({
    name: "LsOverflow",
    props: {
        current: Number,
        total: Number,
        btns: Array,
        showCount: {
            type: Number,
            default: 2,
        },
    },
    setup(prop, { emit }) {
        if (!prop.btns || !(prop.btns instanceof Array)) {
            throw "未检测到按钮内容或按钮格式不是数组";
        }
        const index = computed(() => Math.floor(prop.total / 2));
        let showBtnList = ref([]);
        let overflowBtnList = ref([]);
        const initOverFlow = () => {
            let btnlist = prop.btns.filter((g) => g.term);
            let lenBool = btnlist.length > prop.showCount;
            if (lenBool) {
                showBtnList.value = btnlist.splice(0, prop.showCount);
                overflowBtnList.value = btnlist;
            } else {
                showBtnList.value = btnlist;
            }
        };
        const bclick = (item) => {
            emit("buttonClick", item);
        };
        onMounted(() => {
            initOverFlow();
        });
        watch(
            () => prop.btns,
            () => {
                showBtnList.value = [];
                overflowBtnList.value = [];
                initOverFlow();
            }
        );
        return {
            index,
            showBtnList,
            overflowBtnList,
            bclick,
        };
    },
});
</script>
<style lang="scss" scoped>
.pop-overflow {
    position: relative;
    display: inline-block;
    font-size: 12px;
    &:before {
        content: "···";
        padding: 0 5px;
        cursor: pointer;
        color: $mainColor;
    }
    &:hover {
        .pop-list {
            display: inline-block;
        }
    }
    .up {
        bottom: 10px;
    }
    .down {
        top: 10px;
    }
    .pop-list {
        transition: all 0.5s;
        display: none;
        position: absolute;
        right: 10px;
        z-index: 999;
        background-color: white;
        box-shadow: 0px 0px 2px 0px $mainColor;
        padding: 5px 10px;
        .pop-list-flex {
            display: flex;
            flex-direction: column;
            color: $mainColor;
            &:deep() {
                div {
                    white-space: nowrap;
                    cursor: pointer;
                    padding: 2px 25px;
                    margin: 5px 0;
                    &:hover {
                        background-color: $mainColor;
                        color: white;
                    }
                }
            }
        }
    }
}
</style>

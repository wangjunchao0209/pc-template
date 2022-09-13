<template>
    <div class="ls-trans">
        <trans-item
            :title="title[0]"
            :listContent="arrayList"
            :compareList="chooseArrayList"
            @changeItem="onChange"
            @changeAll="changeAll"
            ref="allForm"
        ></trans-item>
        <div class="trans-btn">
            <ls-button
                icon="ls-icon-right-arrow"
                iconColor="white"
                :disabled="!addList.length"
                position="right"
                type="success"
                style="margin-bottom: 10px"
                @buttonClick="add"
                >{{ buttonText[0] }}</ls-button
            >
            <ls-button
                icon="ls-icon-left-arrow"
                iconColor="white"
                type="success"
                :disabled="!removeList.length"
                @buttonClick="remove"
                >{{ buttonText[1] }}</ls-button
            >
        </div>
        <trans-item
            :title="title[1]"
            :listContent="chooseArrayList"
            @changeItem="onChangeRemove"
            @changeAll="changeAllChoose"
            ref="chooseForm"
        ></trans-item>
    </div>
</template>
<script>
import TransItem from "./trans-item.vue";
import { defineComponent, ref, onUnmounted } from "vue";
export default defineComponent({
    name: "LsTrans",
    components: { TransItem },
    props: {
        buttonText: {
            type: Array,
            default: () => ["", ""],
        },
        title: {
            type: Array,
            default: () => ["", ""],
        },
        list: Array,
        chooseList: Array,
    },
    emits: ["change"],
    setup(prop, { emit }) {
        const allForm = ref(null);
        const chooseForm = ref(null);
        const cl = prop.chooseList.map(o => o);
        const al = prop.list.map(o => o);
        const chooseArrayList = ref(cl);
        const arrayList = ref(al);
        let addList = ref([]);
        let removeList = ref([]);
        // 左侧内容单选
        const onChange = v => {
            if (v.checked) {
                addList.value.push(v);
            } else {
                const i = addList.value.findIndex(f => f.value === v.value);
                addList.value.splice(i, 1);
            }
        };
        // 右侧内容单选
        const onChangeRemove = v => {
            if (v.checked) {
                removeList.value.push(v);
            } else {
                const i = removeList.value.findIndex(f => f.value === v.value);
                removeList.value.splice(i, 1);
            }
        };
        // 左侧全选
        const changeAll = v => {
            addList.value = v;
        };
        // 右侧全选
        const changeAllChoose = v => {
            removeList.value = v;
        };
        // 添加事件
        const add = () => {
            const arrs = arrayList.value.map(v=> v)
            addList.value.forEach(g => {
                const i = arrs.findIndex(f => f.value === g.value);
                arrs.splice(i, 1);
                g.checked = false;
            });
            arrayList.value = arrs
            chooseArrayList.value = [
                ...chooseArrayList.value,
                ...addList.value,
            ];
            addList.value = [];
            allForm.value.reset();
            emit("change", chooseArrayList.value);
        };
        // 移除事件
        const remove = () => {
            const arrs = chooseArrayList.value.map(v=> v)
            removeList.value.forEach(g => {
                const i = arrs.findIndex(
                    f => f.value === g.value
                );
                arrs.splice(i, 1);
                g.checked = false;
            });
            chooseArrayList.value = arrs
            arrayList.value = [...arrayList.value, ...removeList.value];
            removeList.value = [];
            chooseForm.value.reset();
            emit("change", chooseArrayList.value);
        };
        // 初始化数据
        const initArray = () => {
            arrayList.value.forEach(g => {
                delete g.disabled;
                delete g.checked;
            });
        };
        onUnmounted(() => initArray());
        return {
            onChange,
            remove,
            add,
            addList,
            removeList,
            onChangeRemove,
            chooseArrayList,
            arrayList,
            changeAllChoose,
            changeAll,
            allForm,
            chooseForm,
        };
    },
});
</script>
<style lang="scss" scoped>
@import "../theme-style/trans";
</style>

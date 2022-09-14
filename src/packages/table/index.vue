<template>
    <el-table
        :data="tableList"
        class="table-g"
        ref="tableForm"
        style="width: 100%"
        :height="height"
        stripe
        :header-cell-style="{ background: '#ecf1f5' }"
        @selection-change="handleSelectionChange"
    >
        <template v-slot:empty>
            <img
                v-if="!simpleEmpty"
                class="empty-pic"
                src="./empty.png"
                alt=""
            />
            <div class="empty-text">暂无数据</div>
        </template>
        <el-table-column v-if="hasSel" type="selection" width="55">
        </el-table-column>
        <el-table-column
            v-if="hasIndex"
            type="index"
            label="序号"
            align="center"
            width="60"
        >
        </el-table-column>
        <el-table-column
            v-for="item in tableConfigData"
            :key="item.id"
            :label="item.name"
            :min-width="item.width"
            :align="item.align || 'center'"
            :show-overflow-tooltip="item.overflow"
        >
            <template #default="scope">
                <span
                    v-if="item.html"
                    @click="itemClickFn(tableList[scope.$index])"
                    v-html="item.func(scope.row, item.prop)"
                ></span>
                <component
                    v-else-if="item.component"
                    :is="item.component"
                    :info="item.func(scope.row, item.prop)"
                    @change="onChange"
                ></component>
                <span v-else-if="item.func">{{
                    item.func(scope.row, item.prop, option)
                }}</span>
                <span v-else-if="item.isImg" class="img">
                    <template v-for="itemPics in item.prop">
                        <img
                            class="icon-img"
                            :key="itemPics"
                            v-if="scope.row[itemPics]"
                            :src="scope.row[itemPics]"
                            @click="openImg(scope.row[itemPics])"
                            alt="图片加载失败"
                        />
                    </template>
                </span>
            </template>
        </el-table-column>
        <slot></slot>
    </el-table>
    <ls-preview
        v-if="previewStatus"
        :viewSrc="viewSrc"
        v-model:previewStatus="previewStatus"
    ></ls-preview>
</template>
<script>
export default {
    name: "LsTable",
};
</script>
<script setup>
import { ref } from "vue";
const prop = defineProps({
    tableList: Array,
    tableConfigData: Array,
    hasSel: Boolean,
    hasIndex: Boolean,
    height: String,
    simpleEmpty: Boolean,
    option: [Object, Array],
});
const emit = defineEmits(["chooseTable", "cellClick", "onChange"]);
let viewSrc = ref("");
let previewStatus = ref(false);
const handleSelectionChange = el => {
    emit("chooseTable", el);
};
const itemClickFn = el => {
    emit("cellClick", el);
};
const onChange = v => {
    emit("onChange", el);
};
const openImg = srcs => {
    if (!srcs) return;
    viewSrc.value = srcs;
    previewStatus.value = true;
};
</script>
<style lang="scss" scoped>
.table-g {
    font-size: $smallFontSize !important;
    &:deep .el-table__header-wrapper {
        .el-table__cell {
            padding: 11px 0 !important;
        }
    }
    &:deep .el-table__body-wrapper {
        &::-webkit-scrollbar {
            width: 2px;
        }
        td,
        th {
            padding: 0.55vw 0 !important;
        }
        tr:hover {
            background-color: #effdf6 !important;
        }
    }
    .empty-pic {
        margin-top: 20px;
        width: 10vw;
        height: 10vw;
    }
    .empty-text {
        color: #454958;
        font-size: 16px;
    }
    .img .icon-img {
        width: 3vw;
        height: 3vw;
        border: 1px solid #ccc;
        margin: 0 2px;
    }
}
</style>

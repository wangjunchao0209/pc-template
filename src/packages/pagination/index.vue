<template>
    <div :class="['ls-pagination', `ls-pagination-${sizes}`]" v-if="total > 0">
        <div class="total">合计: {{ total }}</div>
        <div class="jump">
            <div class="ls-pagination-num">{{ page }}/{{ totalPage }}</div>
            <div class="ls-pagination-space">跳至:</div>
            <input v-model="pageInput" type="number" @keyup.enter="onchange" />
            <div class="ls-pagination-pageunit">页</div>
        </div>
        <div class="pages">
            <ls-button
                :disabled="page === 1"
                @click="changePage(false, page === 1)"
                icon="ls-icon-left-arrow"
                type="success"
            ></ls-button>
            <ls-button
                :disabled="page === totalPage"
                @click="changePage(true, page === totalPage)"
                icon="ls-icon-right-arrow"
                type="success"
            ></ls-button>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
    name: "LsPagination",
    props: {
        size: String,
        total: [String, Number],
        pageSize: [String, Number],
        currentPage: [String, Number],
        layout: [Array, String],
    },
    setup(prop, event) {
        const sizes = computed(() => prop.size || window.componentSize);
        const totalPage = computed(() =>
            Math.ceil(+prop.total / prop.pageSize)
        );
        let page = ref(1);
        let pageInput = ref("");
        let times = ref(0);
        const clear = ()=> {
            pageInput.value = ''
        }
        const onchange = e => {
            if (pageInput.value === "") {
                return;
            } else if (+pageInput.value > totalPage.value) {
                page.value = pageInput.value = totalPage.value;
            } else if (+pageInput.value < 1) {
                page.value = pageInput.value = 1
            }else {
                page.value = +pageInput.value
            }
            event.emit("currentPageChange", page.value);
            clear()
        };
        const changePage = (bool, status) => {
            if (status) return;
            if (bool) page.value++;
            else page.value--;
            if (times) {
                clearTimeout(times);
            }
            times = setTimeout(() => {
                event.emit("currentPageChange", page.value);
            }, 500);
        };
        watch(()=> prop.currentPage, p=> page.value = p)
        return {
            sizes,
            clear,
            totalPage,
            page,
            changePage,
            onchange,
            pageInput,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "../theme-style/pagination";
</style>

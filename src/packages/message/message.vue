<template>
    <teleport to="body">
        <transition name="down">
            <div :class="['xtx-message', type]" :style="{ top }" v-if="isShow">
                <img
                    class="icon-message"
                    :src="require(`./svg-${type}.svg`)"
                    alt=""
                />
                <span class="text">{{ text }}</span>
            </div>
        </transition>
    </teleport>
</template>
<script>
import { onMounted, ref, defineComponent, nextTick } from "vue";

export default defineComponent({
    name: "XMessage",
    props: {
        text: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            // warn 警告  error 错误  success 成功
            default: "info",
        },
        messageLen: Number,
    },
    setup(prop) {
        // 控制动画
        const isShow = ref(false);
        let top = ref(1);
        nextTick(() => {
            top.value = 45 * prop.messageLen + "px";
        });
        // 组件模板渲染成功后触发
        onMounted(() => {
            isShow.value = true;
        });
        return { isShow, top };
    },
});
</script>
<style scoped lang="scss">
@import "../theme-style/message";
</style>

<template>
    <transition name="fade">
        <ls-dialog
            v-if="confirmStatus"
            :dialogStatus.sync="confirmStatus"
            :noMask="noMask"
            :to="to"
            :width="dialogDesc?.width ?? '22vw'"
            :height="dialogDesc?.height ?? '13vw'"
        >
            <template #dialogTitle>
                <strong class="title-d">{{
                    dialogDesc?.title ?? "提示"
                }}</strong>
            </template>
            <template #dialogContent>
                <div class="content-d">
                    <div class="main-title">
                        {{ dialogDesc?.content }}
                    </div>
                    <div class="snd-text" v-show="dialogDesc?.contentSnd">
                        {{ dialogDesc?.contentSnd }}
                    </div>
                </div>
            </template>
            <template #dialogFoot>
                <div class="btn">
                    <ls-button
                        v-if="dialogDesc?.sureName"
                        @buttonClick="sure"
                        type="success"
                        >{{ dialogDesc?.sureName ?? "确定" }}</ls-button
                    >
                    <ls-button
                        v-if="dialogDesc?.cancelName"
                        @buttonClick="cancel"
                        >{{ dialogDesc?.cancelName ?? "取消" }}</ls-button
                    >
                </div>
            </template>
        </ls-dialog>
    </transition>
</template>
<script>
import { computed, defineComponent } from "vue";
export default defineComponent({
    name: "LsConfirm",
    props: {
        confirmStatus: Boolean,
        noMask: Boolean,
        dialogDesc: Object,
        needCancel: Boolean,
        to: String,
    },
    setup(prop, {emit}) {
        const confirmStatus = computed({
            get: () => prop.confirmStatus,
            set: value => emit("update:confirmStatus", value),
        });
        const cancel = bool => {
            confirmStatus.value = !confirmStatus.value;
            emit("cancel");
        };
        const sure = bool => {
            emit("confirm");
            cancel(true);
        };
        return {
            cancel,
            sure,
            confirmStatus,
        };
    },
});
</script>
<style lang="scss" scoped>
@import "../theme-style/confirm";
</style>

<template>
    <ls-overlay center :to="to">
        <div class="dialog" :style="styles">
            <span class="close el-icon-close" @click="$emit('close')"></span>
            <div class="title">
                <slot class="title" name="dialogTitle"></slot>
            </div>
            <div class="content">
                <slot name="dialogContent"></slot>
            </div>
            <slot name="dialogFoot"></slot>
        </div>
    </ls-overlay>
</template>
<script>
import { computed, defineComponent} from 'vue'
export default defineComponent({
    name: 'LsDialog',
    props: {
        width: {
            type: String,
            default: "25vw"
        },
        height: String,
        dialogStatus: Boolean,
        noMask: Boolean,
        to: String,
    },
    setup(prop) {
        const styles = computed(()=> ({
            width: prop.width,
            height: prop.height,
            minHeight: "220px",
            minWidth: '400px'
        }))
        return {styles}
    }
})
</script>
<style lang="scss" scoped>
@import "../theme-style/dialog";
</style>

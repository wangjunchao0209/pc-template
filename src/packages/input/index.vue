<template>
    <span
        v-if="type === 'textarea'"
        ref="inputBox"
        :class="['ls-textarea', { 'icon-padding': showLimit }]"
        :style="style"
    >
        <textarea
            :rows="rows"
            :class="['textarea', { disabled, error }]"
            :disabled="disabled"
            :readonly="fieldFilter"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :value="modelValue"
            :style="{ resize: noresize ? 'none' : '' }"
            @input.prevent.stop="inputEvent"
            @change.stop="onChange"
            @blur.stop="blur"
        />
        <div
            v-if="showLimit && !isNaN(maxlength) && type !== 'number'"
            class="limit"
        >
            {{ (modelValue && modelValue.length) || 0 }}/{{ maxlength }}
        </div>
    </span>
    <span
        v-else
        ref="inputBox"
        :class="[
            'ls-input',
            `input-${sizes}`,
            {
                'icon-padding': icon || clearable || showLimit,
                 'hoverClear': clearable && modelValue
            },
        ]"
        @click="focus"
        :style="style"
    >
        <input
            :class="['input', { disabled, error }]"
            :disabled="disabled"
            :readonly="!fieldFilter && isSelect"
            :placeholder="placeholder"
            :type="type"
            :value="modelValue"
            :maxlength="maxlength"
            @input.prevent.stop="inputEvent"
            @change.stop="onChange"
            @blur.stop="blur"
        />
        <component
            v-if="icon"
            :is="icon"
            :class="['icons-input', { rotateIcon }]"
        ></component>
        <div
            v-if="showLimit && !isNaN(maxlength) && type !== 'number'"
            class="limit"
        >
            {{ (modelValue && modelValue.length) || 0 }}/{{ maxlength }}
        </div>
        <ls-icon-close-fill
            class="clear"
            v-if="clearable && modelValue"
            @click="clear"
        ></ls-icon-close-fill>
        <span class="error-text">{{errorInner}}</span>
    </span>
</template>

<script>
import { computed, defineComponent, ref, getCurrentInstance } from "vue";

export default defineComponent({
    name: "LsInput",
    props: {
        size: String,
        clearable: {
            type: Boolean,
            default: false,
        },
        isSelect: Boolean,
        rotate: Boolean,
        required: Boolean,
        icon: String,
        rows: String,
        reg: RegExp,
        errorText: String,
        noresize: Boolean,
        type: String,
        maxlength: Number,
        placeholder: String,
        style: Object,
        showLimit: Boolean,
        fieldFilter: {
            type: Boolean,
            default: false,
        },
        modelValue: [Number, String],
        disabled: [Number, Boolean],
    },
    setup(prop, {emit}) {
        const instance = getCurrentInstance();
        const sizes = computed(() => prop.size || window.componentSize);
        let value = ref("");
        const inputBox = ref(null);
        let rotateIcon = ref(false);
        let focusStatus = ref(false);
        let error = ref(false);
        let times = ref(0)
        let errorInner = ref('')
        const blur = $event=> {
            value.value = $event.target.value
            errorInner.value = ''
            if (prop.required && value.value === "") {
                error.value = true;
                errorInner.value = '内容不能为空'
            } else if (prop.reg && !prop.reg.test(value.value)) {
                error.value = true;
                errorInner.value = prop.errorText
            } else {
                error.value = false;
            }
        }
        const onChange = $event => {
            value.value = $event.target.value
            if (prop.disabled) return;
            blur()
            emit("update:modelValue", value.value);
        };
        const inputEvent = $event => {
            if (prop.disabled) return;
            if(times.value) clearTimeout(times.value)
            times.value = setTimeout(()=> {
                value.value = $event.target.value
                emit("update:modelValue", value.value);
                emit("changeValue", value.value);
            }, 200)
        };
        const focus = () => {
            if (prop.disabled) return;
            if (prop.rotate) {
                rotateIcon.value = !rotateIcon.value;
                emit("focus", value.value, rotateIcon.value);
            } else {
                focusStatus.value = !focusStatus.value
                emit("focus", value.value, focusStatus.value);
            }
            
        };
        const backPos = () => {
            if (prop.rotate) {
                rotateIcon.value = false;
            }
        };

        const clear = () => {
            emit("update:modelValue", '');
            emit("changeValue", "");
        };
        const getInputRef = () => inputBox.value;
        return {
            sizes,
            value,
            onChange,
            focus,
            blur,
            errorInner,
            clear,
            inputEvent,
            rotateIcon,
            backPos,
            getInputRef,
            inputBox,
            error,
        };
    },
});
</script>

<style lang="scss" scoped>
@import "../theme-style/input";
</style>

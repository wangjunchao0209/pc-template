<template>
    <div v-if="button" class="ls-upload-button">
        <ls-button type="success">上传文件</ls-button>
        <input
            class="upload-input"
            type="file"
            :ref="`uploadFileS${index}`"
            @change="fileChange"
            :accept="accept"
        />
    </div>
    <div
        v-else
        class="ls-upload"
        :style="{
            'min-height': styles.height + 25 + 'px',
            width: showLoadLength.length * styles.width + 14 + 'px',
        }"
    >
        <div
            :style="{
                minWidth: styles.width + 'px',
                height: styles.height + 'px',
            }"
            v-for="(pic, index) in showLoadLength"
            :key="pic"
            :class="['upload', { 'no-file': !showPro && !pic }]"
        >
            <ls-icon-plus v-if="!showPro && !pic" class="icons" />
            <input
                class="upload-input"
                type="file"
                :ref="`uploadFileS${index}`"
                :disabled="disabled || pic !== ''"
                @change="fileChange"
                :accept="accept"
            />
            <img
                v-if="pic !== '' && isImg"
                :class="{ 'src-img': isImg, 'file-img': !isImg }"
                :src="pic"
                @click="previewBtn(pic)"
            />
            <video
                ref="MediaS"
                :class="['videos', { poster: isAudio }]"
                v-if="pic !== '' && (isAudio || isVideo)"
                :src="pic"
                @click="previewBtn(pic)"
            ></video>
            <ls-icon-close-fill
                v-show="pic && !disabled && !showPro && !readOnly"
                class="del-icon"
                @click.stop="delFile(index)"
            />
            <div
                v-show="showPro && index === showLoadLength.length - 1"
                class="prog"
            >
                <ls-progress
                    round
                    circle
                    showValue
                    :value="widthP"
                    type="success"
                />
            </div>
        </div>
        <span :style="{ ...textPosition }" class="desc">{{ desc }}</span>
    </div>
    <ls-preview
        v-if="previewStatus"
        :viewSrc="viewSrc"
        :isVideo="isVideo"
        v-model:previewStatus="previewStatus"
    ></ls-preview>
</template>
<script>
import { getCurrentInstance, computed, ref, onMounted, reactive } from "vue";
import {
    getType,
    getSize,
    getFormData,
    getImgSize,
} from "../utils/uploadCheck";
import axios from "axios";
export default {
    name: "LsUpload",
    props: {
        styles: {
            type: Object,
            default: () => ({
                width: 100,
                height: 100,
            }),
        },
        customUpload: Function,
        accept: String,
        desc: String,
        data: {
            type: Object,
            default: () => {},
        },
        header: {
            type: Object,
            default: () => {},
        },
        value: {
            type: String,
            default: "",
        },
        limit: {
            type: Number,
            default: 1,
        },
        proper: String,
        disabled: Boolean,
        inside: Boolean,
        preview: Boolean,
        unit: String,
        range: Number,
        index: Number,
        action: String,
        size: Array,
        button: Boolean,
        showFileList: Boolean,
        readOnly: Boolean,
    },
    setup(prop, { emit }) {
        if (typeof prop.value !== "string")
            throw "ls-upload默认值仅支持String类型,多个值请用英文逗号分隔";
        let widthP = ref(0);
        let previewStatus = ref(false);
        let viewSrc = ref("");
        let showPro = ref(false);
        const { ctx, proxy } = getCurrentInstance();
        let refs = reactive(null);
        const isImg = computed(() => prop.accept.includes("image"));
        const isVideo = computed(() => prop.accept.includes("video"));
        const isAudio = computed(() => prop.accept.includes("audio"));
        const textPosition = computed(() => {
            if (prop.limit === 1 && prop.inside) {
                return {
                    left: parseInt(prop.styles.width) + 30 + "px",
                    bottom: "30px",
                };
            } else {
                return {
                    left: 0,
                    bottom: "-10px",
                };
            }
        });
        const vLen = computed(() => prop.value.split(",").filter((v) => v));
        const showLoadLength = computed(() => {
            if (prop.limit === 1) {
                if (vLen.value.length === 0) return [""];
                else return [vLen.value[0]];
            }
            if (vLen.value.length >= prop.limit) {
                return vLen.value;
            }
            return [...vLen.value, ""];
        });
        onMounted(() => {
            refs = ctx._.refs;
        });
        const clearPic = () => {
            refs[`uploadFileS${showLoadLength.value.length - 1}`].value = null;
        };
        const successS = (res) => {
            showPro.value = false;
            emit("uploadSuccess", {
                proper: prop.proper,
                data: res.data,
                response: res,
                list: prop.value.split(","),
            });
            clearPic();
        };
        const failS = (e) => {
            console.dir(e, "上传失败");
            showPro.value = false;
            clearPic();
            emit("uploadFail");
        };
        const pro = {
            onUploadProgress: (progressEvent) => {
                let percent =
                    ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                widthP.value = percent;
            },
        };
        const startUpload = (param) => {
            showPro.value = true;
            axios
                .post(prop.action, param, { ...pro, headers: prop.header })
                .then((res) => {
                    successS(res);
                })
                .catch(failS);
        };
        const customFn = async (param) => {
            showPro.value = true;
            prop.customUpload(param, pro)
                .then((res) => {
                    successS(res);
                })
                .catch(failS);
        };
        const fileChange = (e) => {
            if (vLen.value.length > prop.limit) {
                throw new Error("超出最大上传限制");
            }
            widthP.value = 0;
            const { files } = e.target;
            if (!files) return;
            const file = files[0];
            const isIncludeType = getType(file.type, prop.accept, file.name);
            if (!isIncludeType) {
                proxy.$lsmessage({ text: "不支持的类型", type: "warning" });
                clearPic();
                return;
            }
            const size = getSize(file.size, prop.range, prop.unit);
            if (!size) {
                clearPic();
                return;
            }
            const param = getFormData({
                file,
                ...prop.data,
            });
            if (
                prop.size &&
                prop.size?.length === 2 &&
                file.type.includes("image")
            ) {
                const imgsrc = window.URL.createObjectURL(file);
                getImgSize(prop.size, imgsrc).then(() => {
                    if (prop.customUpload) {
                        if (!prop.customUpload instanceof Function) {
                            throw new Error("自定义方法必须是Function类型");
                        }
                        customFn(param);
                        return;
                    }
                    startUpload(param);
                }).catch(()=> clearPic());
                return;
            }
            if (prop.customUpload) {
                if (!prop.customUpload instanceof Function) {
                    throw new Error("自定义方法必须是Function类型");
                }
                customFn(param);
                return;
            }
            startUpload(param);
        };
        const delFile = (index) => {
            emit("delCurrentFile", {
                proper: prop.proper,
                delValue: vLen.value[index],
                delIndex: index,
                list: vLen.value,
            });
        };
        const previewBtn = (path) => {
            if (!prop.preview) return;
            viewSrc.value = path;
            previewStatus.value = true;
        };
        return {
            widthP,
            showPro,
            isImg,
            isVideo,
            isAudio,
            textPosition,
            delFile,
            fileChange,
            showLoadLength,
            viewSrc,
            previewStatus,
            previewBtn,
        };
    },
};
</script>
<style lang="scss" scoped>
@import "../theme-style/upload";
</style>

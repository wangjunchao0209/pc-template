<template>
    <div class="ls-upload-btn">
        <div class="btn-u">
            <input
                class="upload-input"
                type="file"
                ref="uploadFileBtn"
                @change="fileChange"
                :accept="accept"
            />
            <ls-button @buttonClick="uploadStart" type="success">{{uploadButtonName}}</ls-button>
        </div>
        <div class="desc">{{ desc }}</div>
        <div
            v-for="(names, index) in filename.list"
            :key="names + index"
            class="file-name"
        >
            <span class="f-name" :title="names">
                {{names}}
            </span>
            <ls-icon-close-fill class="close-icon" @click="delFile(index)"></ls-icon-close-fill>
        </div>
        <div
            v-show="showPro"
            class="prog"
        >
            <ls-progress round stroke="3" :value="widthP" type="success" />
        </div>
    </div>
</template>
<script>
import { getCurrentInstance, computed, ref, reactive } from "vue";
import { getType, getSize, getFormData, getFileName } from "../utils/uploadCheck";
import axios from "axios";
export default {
    name: "LsUploadBtn",
    props: {
        uploadButtonName: {
            type: String,
            default: '上传文件'
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
        unit: String,
        range: Number,
        index: Number,
        action: String,
    },
    setup(prop, { emit }) {
        if (typeof prop.value !== "string")
            throw "ls-upload默认值仅支持String类型,多个值请用英文逗号分隔";
        let widthP = ref(0);
        let filename = reactive({list: []});
          if(prop.value) {
            filename.list = getFileName(prop.value)
        }
        let showPro = ref(false);
        const { proxy } = getCurrentInstance();
        let uploadFileBtn = ref(null);
        const vLen = computed(() => prop.value.split(",").filter(v=> v));
        const successS = (res, name) => {
            if (res.status === 200) {
                showPro.value = false;
                filename.list.push(name)
                emit("uploadSuccess", {
                    proper: prop.proper,
                    data: res.data,
                    list: prop.value.split(","),
                });
                uploadFileBtn.value.value = null;
            }
        };
        const failS = e => {
            console.dir(e, "上传失败");
            showPro.value = false;
            uploadFileBtn.value.value = null;
            emit("uploadFail");
        };
        const pro = {
            onUploadProgress: progressEvent => {
                let percent =
                    ((progressEvent.loaded / progressEvent.total) * 100) | 0;
                widthP.value = percent;
            },
        };
        const startUpload = (param, name) => {
            showPro.value = true;
            axios
                .post(prop.action, param, { ...pro, headers: prop.header })
                .then(res => {
                    successS(res, name);
                })
                .catch(failS);
        };
        const customFn = async param => {
            showPro.value = true;
            prop.customUpload(param, pro)
                .then(res => {
                    successS(res);
                })
                .catch(failS);
        };
        const fileChange = e => {
            if(filename.list.length >= prop.limit) {
                throw new Error('超出最大上传限制')
            }
            widthP.value = 0;
            const { files } = e.target;
            if (!files) return;
            const file = files[0];
            const isIncludeType = getType(file.type, prop.accept);
            if (!isIncludeType) {
                proxy.$lsmessage({ text: "不支持的类型", type: "warning" });
                return;
            }
            const size = getSize(file.size, prop.range, prop.unit);
            if (!size) return;
            const param = getFormData({
                file,
                ...prop.data,
            });
            if (prop.customUpload) {
                if (!prop.customUpload instanceof Function) {
                    throw new Error("自定义方法必须是Function类型");
                }
                customFn(param, file.name);
                return;
            }
            startUpload(param, file.name);
        };
        const delFile = index => {
            filename.list.splice(index, 1)
            emit("delCurrentFile", {
                proper: prop.proper,
                delValue: vLen.value[index],
                delIndex: index,
                list: vLen.value,
            });
        };
        return {
            widthP,
            showPro,
            delFile,
            filename,
            fileChange,
            uploadFileBtn
        };
    },
};
</script>
<style lang="scss" scoped>
@import "../theme-style/upload-btn";
</style>

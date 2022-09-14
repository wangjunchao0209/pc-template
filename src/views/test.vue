<template>
    <div class="test">
        <div class="hello">
            <ls-button
                loading
                type="success"
                size="mini"
            >添加路由</ls-button>
            <ls-button
                @buttonClick="open"
                type="success"
                size="mini"
            >添加路由</ls-button>
            <ls-button
                @buttonClick="open1"
                iconColor="green"
                icon="ls-icon-plus"
                type="error"
                size="small"
            >添加路由</ls-button>
            <ls-button
                @buttonClick="open2"
                size="large"
            >添加路由</ls-button>
            <ls-button
                @buttonClick="open3"
                disabled
                size="large"
            >dialog</ls-button>
        </div>
        <div class="hello">
            <!-- <ls-table
                :tableConfigData="appTable"
                :tableList="list"
                selection
                align="center"
            >

            </ls-table> -->
            <ls-calendar
                :width="265"
                round
                v-model="times1"
                @change="onChange"
            ></ls-calendar>
            <ls-calendar-range
                :width="265"
                round
                v-model="times1"
                @change="onChange"
            ></ls-calendar-range>
            <ls-date type="range"> </ls-date>
        </div>
        <div class="hello">
            <div class="is-important"></div>
            <ls-input
                v-model="text"
                clearable
                proper="worksNum"
                placeholder="请输入作品编号"
                size="mini"
                :callback="inputCallback"
                @change="onChange"
            />
            <ls-input
                v-model="text1"
                showLimit
                clearable
                required
                :maxlength="50"
                proper="worksNum"
                placeholder="请输入作品编号"
                size="small"
                :callback="inputCallback"
                @change="onChange"
            />
            <ls-input
                v-model="text2"
                proper="worksNum"
                placeholder="请输入作品编号"
                :maxlength="10"
                showLimit
                type="number"
                size="large"
                :callback="inputCallback"
                @change="onChange"
            />
            <ls-input
                v-model="text2"
                proper="worksNum"
                placeholder="请输入作品编号"
                :max="20"
                type="search"
                size="large"
                :callback="inputCallback"
                @change="onChange"
            />
            <ls-input
                type="textarea"
                v-model="text2"
                proper="worksNum"
                placeholder="请输入作品编号"
                :maxlength="1000"
                showLimit
                noresize
                rows="2"
                size="large"
                :style="{ width: '300px' }"
                :callback="inputCallback"
                @change="onChange"
            />
        </div>
        <div class="hello">
            <ls-select
                v-model="s"
                placeholder="请选择222"
                size="mini"
                fieldFilter
                :options="options"
            >
            </ls-select>
            <ls-select
                :options="options1"
                v-model="s1"
                placeholder="请选择333"
                size="small"
                clearable
            >
            </ls-select>
            <ls-select-mult
                :options="options1"
                v-model="sarr"
                placeholder="请选择54444"
                clearable
            >
            </ls-select-mult>
            <ls-select-mult
                fold
                :options="options1"
                v-model="sarr"
                placeholder="请选择54444"
                clearable
            >
            </ls-select-mult>
        </div>
        <ls-drawer size="small" v-model:drawer="drawer">
            <template #title>
                <div style="color: red">title</div>
            </template>
            <section>small</section>
            <template #foot>
                <ls-button
                    v-if="!noBtn"
                    @buttonClick="sure"
                    type="success"
                    :loading="loading"
                >确 定</ls-button>
                <ls-button @buttonClick="bbb">取 消</ls-button>
            </template>
        </ls-drawer>
        <ls-drawer
            title="largelargela"
            showClose
            size="large"
            v-model:drawer="drawer2"
        >
            <div>large</div>
            <div>large</div>
            <div>large</div>
            <div>large</div>
            <template #foot>
                <ls-button
                    @buttonClick="sure"
                    type="success"
                    :loading="loading"
                >修 改</ls-button>
                <ls-button @buttonClick="bbb">关 闭</ls-button>
            </template>
        </ls-drawer>
        <ls-drawer title="lotlarge" size="lotlarge" v-model:drawer="drawer1">
            <section>lotlarge</section>
            <template #foot>
                <ls-button
                    v-if="!noBtn"
                    @buttonClick="sure"
                    type="success"
                    :loading="loading"
                >确 定</ls-button>
                <ls-button @buttonClick="bbb">取 消</ls-button>
            </template>
        </ls-drawer>
        <ls-confirm
            v-model:confirmStatus="statusConfirm"
            :dialogDesc="dialogDesc"
        />
        <div class="hello">
            <ls-switch size="mini" v-model:switchStatus="status1" disabled />
            <ls-switch
                size="small"
                activeText="是"
                unActiveText="否"
                v-model:switchStatus="status2"
                @change="onChange"
            />
            <ls-switch
                size="large"
                activeText="Yes"
                unActiveText="No"
                v-model:switchStatus="status3"
            />
            <ls-switch
                size="large"
                activeText="是"
                unActiveText="否"
                v-model:switchStatus="status3"
            />
        </div>
        <div class="hello">
            <ls-tag type="success" label="111" size="mini" background></ls-tag>
            <ls-tag type="info" label="222" size="small"></ls-tag>
            <ls-tag type="warning" label="333" size="large"></ls-tag>
            <ls-tag type="error" label="444" size="small"></ls-tag>
            <ls-tag size="mini" label="555"></ls-tag>
        </div>
        <div class="hello">
            <ls-tag :label="options" color="purple" size="mini" clear></ls-tag>
        </div>
        <div class="hello">
            <ls-checkbox
                size="mini"
                label="3123"
                v-model:checked="status1"
                disabled
                @change="onChange"
            />
            <ls-checkbox
                size="small"
                label="31231"
                v-model:checked="status2"
                @change="onChange"
            />
            <ls-checkbox
                size="large"
                label="31232"
                v-model:checked="status3"
                @change="onChange"
                half
            />
        </div>
        <div class="hello">
            <ls-radio
                size="mini"
                label="3123"
                value="11"
                disabled
                v-model:checked="radio"
            />
            <ls-radio
                size="small"
                label="31231"
                value="22"
                v-model:checked="radio"
            />
            <ls-radio
                size="large"
                label="31232"
                value="33"
                v-model:checked="radio"
                @change="onChange"
            />
            <ls-radio
                size="small"
                label="31232"
                value="44"
                v-model:checked="radio"
            />
            <ls-radio
                size="mini"
                label="31232"
                value="55"
                v-model:checked="radio"
            />
            <ls-radio
                size="large"
                label="31232"
                value="66"
                v-model:checked="radio"
            />
        </div>
        <div class="hello1">
            <div style="width: 100px">
                <ls-progress showValue type="success" circle :value="pp" />
            </div>
            <ls-progress
                type="success"
                showValue
                round
                textInside
                stroke="10"
                :value="pp"
            />
            <ls-progress showValue textInside :value="pp" />
            <ls-progress :value="pp" />
            <ls-progress :value="pp" />
        </div>
        <div class="hello">
            <ls-upload-btn
                accept="image/png,image/jpeg,image/gif"
                proper="activityCover"
                action="http://opmpt600.systoon.com/opmp-api/platform/uploadFile"
                :header="header"
                :limit="3"
                :data="dataObj"
                value="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F19100120461512E-0-lp.jpg,https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F19100122420C335-0-lp.jpg"
                preview
                unit="M"
                :range="50"
                @uploadSuccess="onChange"
                @delCurrentFile="delCurrentFile"
                desc="只能输入image/png,image/jpeg,image/gif"
            />
        </div>
        <div class="hello">
            <ls-upload
                accept="image/png,image/jpeg,image/gif"
                proper="activityCover"
                action="http://opmpt600.systoon.com/opmp-api/platform/uploadFile"
                :header="header"
                :limit="3"
                :data="dataObj"
                :value="uVal"
                preview
                :customUpload="cusUpload"
                unit="M"
                :range="50"
                @uploadSuccess="onChangeU"
                @uploadFail="onChangeU"
                @delCurrentFile="del"
                desc="只能输入image/png,image/jpeg,image/gif"
            />
        </div>
        <div class="hello">
            <ls-upload
                accept="video/mp4"
                proper="activityCover"
                action="http://opmpt600.systoon.com/opmp-api/platform/uploadFile"
                :header="header"
                preview
                value="https://www.w3school.com.cn/i/movie.ogg"
                :data="dataObj"
                unit="M"
                :range="50"
                @uploadSuccess="onChangeU"
                @delCurrentFile="delCurrentFile"
                desc="只能输入image/png,image/jpeg,image/gif"
            />
        </div>
        <div class="hello">
            <ls-upload
                accept="image/png,image/jpeg,image/gif"
                proper="activityCover"
                :header="header"
                preview
                :limit="2"
                value="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F19100122420C335-0-lp.jpg"
                :data="dataObj"
                unit="M"
                :range="50"
                @uploadSuccess="onChangeU"
                @delCurrentFile="delCurrentFile"
                desc="只能输入image/png,image/jpeg,image/gif"
            />
        </div>
    </div>
</template>
<script>
import { appTable } from "@/data/tableConfig.js";
import { list } from "@/data/test.js";
import axios from "axios";
export default {
    name: "HelloWorld",
    data() {
        return {
            text: "123123",
            text1: "",
            text2: "",
            s: "2123",
            statusConfirm: false,
            appTable,
            list,
            s1: "122",
            radio: "22",
            sarr: ["22", "122"],
            uVal: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F19100120461512E-0-lp.jpg,https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp05%2F19100122420C335-0-lp.jpg",
            // sarr: 123,
            options: [
                {
                    label: "测试1",
                    value: "1",
                },
                {
                    label: "测试2",
                    value: "2",
                },
                {
                    label: "测试3",
                    value: "132",
                },
                {
                    label: "测试2",
                    value: "2123",
                },
                {
                    label: "测试3",
                    value: "13",
                },
            ],
            options1: [
                {
                    label: "测试1",
                    value: "14",
                    disabled: true,
                },
                {
                    label: "测试2",
                    value: "22",
                },
                {
                    label: "测试3",
                    value: "133",
                },
                {
                    label: "测试1",
                    value: "122",
                    disabled: true,
                },
                {
                    label: "测试2",
                    value: "2123",
                },
                {
                    label: "测试3",
                    value: "13",
                },
            ],
            drawer: false,
            drawer1: false,
            drawer2: false,
            pp: 30,
            dataObj: {},
            header: {
                "X-Tocm-SSID": "925f3fb0ca949c4dfecf32d0fbfa7f6a",
                "X-Tocm-User-Token":
                    "G8g2xw4Z1JvqGw64sTYjfXPRpJeCkxzkDwj9a7rLzr1JqHTke24AifKPx5z7fNngesKeCNRNPqEerppEwnq8KArdgxn2fEl7zKvu6f6nFDye0gDDf0fNOhiqyZJZdbxgc6A",
            },
            dialogDesc: {
                content: "测试专用",
                cancelName: "取 消",
                sureName: "确 定",
            },
            status1: false,
            status2: 1,
            status3: false,
            times1: "",
        };
    },
    props: {},
    components: {},
    watch: {
        text(v) {
            console.log(v, 998);
        },
    },
    mounted() {
        window.componentSize = "small";
        // setInterval(()=> this.pp++, 100)
        // setTimeout(()=> this.s = '', 2000)
        // setTimeout(()=> this.s = '13', 4000)
        this.$lsmessage({
            duration: 1500,
            text: "不支持的类型",
            type: "info",
        });
        setTimeout(
            () =>
                this.$lsmessage({
                    duration: 1000,
                    text: "不支持的类型",
                    type: "warning",
                }),
            1000
        );
        setTimeout(
            () =>
                this.$lsmessage({
                    duration: 1000,
                    text: "不支持的类型",
                    type: "warning",
                }),
            2000
        );
        setTimeout(
            () =>
                this.$lsmessage({
                    duration: 1000,
                    text: "不支持的类型",
                    type: "warning",
                }),
            4000
        );
    },
    methods: {
        onChange(s) {
            console.log(s, "change");
        },
        onChangeU(s) {
            if (s.data.meta.code === 0) {
                s.list.push(s.data.data.pubUrl);
                this.uVal = s.list.join(",");
            }
        },
        del(s) {
            s.list.splice(s.delIndex, 1);
            this.uVal = s.list.join(",");
        },
        onBlur(s) {
            console.log(s);
        },
        onFocus(s) {
            console.log(s);
        },
        open() {
            this.drawer = true;
        },
        open1() {
            this.drawer1 = true;
        },
        open2() {
            console.log(this.s1, this.s, "#####");
            console.log(this.status3, this.status2, "#####");
            // this.drawer2 = true;
        },
        open3() {
            this.statusConfirm = true;
        },
        bbb() {
            this.drawer2 = false;
            this.drawer1 = false;
            this.drawer = false;
        },
        cusUpload(param, progress) {
            return axios.post(
                "http://opmpt600.systoon.com/opmp-api/platform/uploadFile",
                param,
                { ...progress, headers: this.header }
            );
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.test {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
.hello {
    display: flex;
    width: 100%;
    justify-content: space-around;
    // overflow: hidden;
    margin-bottom: 30px;
    padding: 10px 50px;
}
.hello1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    // overflow: hidden;
    margin-bottom: 30px;
    padding: 10px 50px;
}
section {
    flex: 1;
}
</style>

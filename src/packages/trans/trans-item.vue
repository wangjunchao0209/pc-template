<template>
    <div class="ls-trans-item">
        <div class="trans-title">
            <el-checkbox
                v-model="allCheck"
                label="全选"
                size="large"
                @change="onChangeAll"
            ></el-checkbox>
            <span class="title-name">{{ title }}</span>
        </div>
        <div class="trans-input">
            <el-input
                v-model="sname"
                placeholder="请输入搜索名称"
                size="mini"
                :style="{ width: '220px' }"
            />
        </div>
        <div class="trans-box">
            <el-checkbox
                v-if="list.length"
                v-for="(item, index) in list"
                :key="item.value"
                v-model="item.checked"
                :label="item.label"
                :disabled="item.disabled"
                size="mini"
                @change="onChange(item)"
            ></el-checkbox>
            <div v-else class="no-data">
                暂无内容
            </div>
        </div>
    </div>
</template>
<script>
import {
    defineComponent,
    ref,
    watch,
    computed
} from "vue";
export default defineComponent({
    name: "LsTrans",
    props: {
        listContent: Array,
        compareList: Array,
        title: {
            type: String,
            default: '全部内容'
        }
    },
    setup(prop, {emit}) {
        const al = computed(()=> prop.listContent)
        let list = ref(al.value)
        let allCheck = ref(false)
        let sname = ref('')
        let tt = null
        const onChange = (v)=> {
            const bool = list.value.every(f=> f.checked)
            if(bool) allCheck.value = true
                else allCheck.value = false
            emit('changeItem', v)
        }
        const onChangeAll = v=> {
            let ll = []
            list.value.forEach(f=> {
                f.checked = v
                if(v) ll.push(f)
            })
            emit('changeAll', ll)
        }
        const reset = ()=> {
            allCheck.value = false
            sname.value = ''
        }
        const search = v=> {
            list.value = al.value.filter(f=> f.label.includes(v))
        }

        const sChange = val=> {
            const v = val.trim()
            if(v === '') {
                list.value = al.value
            } else {
                search(v)
            }
        }

        watch(al, v=> {
            list.value = v
        })
        watch(sname, v=> {
            if(tt) clearTimeout(tt)
            tt = setTimeout(()=> {
                sChange(v)
            }, 300)
        })
        return {
            allCheck,
            sname,
            onChange,
            list,
            onChangeAll,
            sChange,
            reset
        }
    }
})
</script>
<style lang="scss" scoped>
@import "../theme-style/trans-item";
</style>

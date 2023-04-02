<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="selectData.title" placeholder="输入关键字" />
                </el-form-item>
                <el-form-item label="详情">
                    <el-input v-model="selectData.introduce" placeholder="输入关键字" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <el-table :data="dataList.computedList" border style="width: 100%">
            <el-table-column prop="id" label="Id" width="180" />
            <el-table-column prop="title" label="Title" width="180" />
            <el-table-column prop="introduce" label="Introduce" />
        </el-table>
        <el-pagination @current-change="currentChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count * 2" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { getGoodsList } from '@/request/api';
import {InitData, ListInt} from "@/type/goods"

export default defineComponent({
    setup () {
        const data = reactive(new InitData)
        onMounted(()=>{
            getGoods()
        })
        const getGoods = ()=>{
            getGoodsList().then(res=>{
                // console.log("get一次",res)
                data.list = res.data.data
                data.selectData.count = res.data.data.length
                // console.log(data.selectData.count)
            })
        }
        
        const dataList=reactive({
            computedList :computed(()=>{
                return data.list.slice(
                    (data.selectData.page-1)*data.selectData.pagesize,
                    data.selectData.page*data.selectData.pagesize
                )
            })
        })
        // console.log(data.list)
        const currentChange = (page:number)=>{
            // console.log("pagechange",page)
            data.selectData.page = page
        }
        const sizeChange = (pagesize:number)=>{
            // console.log("sizechange",pagesize)
            data.selectData.pagesize = pagesize
        }
        const onSubmit = ()=>{
            console.log(data.list)
            let arr:ListInt[] = []
            if(data.selectData.title || data.selectData.introduce){
                if(data.selectData.title){
                    arr = data.list.filter(value=>{
                        return value.title.indexOf(data.selectData.title) !== -1
                    })
                }
                if(data.selectData.introduce){
                    arr = data.list.filter(value=>{
                        return value.title.indexOf(data.selectData.introduce) !== -1
                    })
                }
            }else{
                arr = data.list
            }
            data.list = arr
            data.selectData.count = arr.length
        }
        //监听输入框的属性
        watch([()=>data.selectData.title,()=>data.selectData.introduce],()=>{
            if(data.selectData.title=='' && data.selectData.introduce==''){
                getGoods()
            }
        })
        return {...toRefs(data),sizeChange,currentChange,dataList,onSubmit }
    }
})
</script>

<style scoped>

</style>
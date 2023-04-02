<template>
    <div>
        
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="selectData.nickName" placeholder="输入姓名" />
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="selectData.role" class="m-2" placeholder="Select" size="large">
                    <el-option
                    label="全部"
                    :value="0"
                    />
                    <el-option
                    v-for="item in roleList"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                    />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="id" label="Id" width="180" />
            <el-table-column prop="nickName" label="nickName" width="180" />
            <el-table-column prop="role" label="角色">
                <template #default="scope">
                    <el-button
                    v-for="item in scope.row.role"
                    :key="item.role"
                    size="small"
                    >
                    {{ item.roleName }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="role" label="操作">
                <template #default="scope">
                    <el-button
                    link
                    type="primary"
                    size="small"
                    @click="changeUser(scope.row)"
                    >
                    编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination @current-change="currentChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count * 2" /> -->
        <el-dialog v-model="isShow" title="编辑信息">
            <el-form :model="active">
                <el-form-item label="姓名" :label-width="50">
                    <el-input v-model="active.nickName" autocomplete="off" />
                </el-form-item>
                <el-form-item label="角色" :label-width="50">
                    <el-select multiple v-model="active.role" placeholder="选择角色">
                        <el-option
                        v-for="item in roleList"
                        :key="item.roleId"
                        :label="item.roleName"
                        :value="item.roleId"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="updateRole">更改</el-button>
                    <el-button type="primary" @click="isShow = false">
                    取消
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import{getRoleList, getUserList} from "@/request/api"
import {InitData, ListInt} from "../type/user"
export default defineComponent({
    setup () {
        const data = reactive(new InitData)
        onMounted(()=>{
            getUser()
            getRole()
        })
        const getUser = ()=>{
            getUserList().then((res)=>{
                console.log(res)
                data.list = res.data.data
            })
        }
        const getRole = ()=>{
            getRoleList().then((res)=>{
                console.log(res)
                data.roleList = res.data.data
            })
        }
        const onSubmit = ()=>{
            console.log(data.list)
            let arr:ListInt[] = []
            if(data.selectData.nickName || data.selectData.role){
                if(data.selectData.nickName){
                    arr = data.list.filter(value=>{
                        return value.nickName.indexOf(data.selectData.nickName) !== -1
                    })
                }
                // console.log(data.selectData.role,"datarole")
                if(data.selectData.role){
                    arr = data.list.filter(value=>{
                        // console.log(value,"value")
                        return value.role.find((item)=>{
                            // console.log(item.role,"role")
                            return item.role === data.selectData.role
                        })
                    })
                }
            }else{
                arr = data.list
            }
            // console.log(arr)
            data.list = arr
        }
        const changeUser = (row:ListInt)=>{
            // console.log(row)
            // console.log(row.id)
            data.active = {
                id:row.id,
                nickName:row.nickName,
                userName:row.userName,
                role:row.role.map((value:any)=>value.role || value.roleId)
            }
            data.isShow = true
        }
        const updateRole = ()=>{
            let obj:any = data.list.find((value)=>value.id===data.active.id)
            obj.nickName = data.active.nickName
            obj.role = data.roleList.filter(value=>data.active.role.indexOf(value.roleId)!==-1)
            data.list.forEach((item,i)=>{
                if(item.id == obj.id){
                    data.list[i] = obj
                }
            })
            data.isShow = false
        }
        watch([()=>data.selectData.nickName,()=>data.selectData.role],()=>{
            if(data.selectData.nickName==='' || data.selectData.role===0){
                getUser()
            }
        })
        return {...toRefs(data),onSubmit,changeUser,updateRole }
    }
})
</script>

<style scoped>

</style>
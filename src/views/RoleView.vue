<template>
    <div>

        <el-form :inline="true" class="search-form">
            <el-form-item>
                <el-button type="primary" @click="onAddRole()">添加角色</el-button>
            </el-form-item>
        </el-form>
       
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="roleId" label="Id" width="180" />
            <el-table-column prop="roleName" label="角色名字" width="180" />
            <el-table-column prop="authority" label="操作">
                <template #default="scope">
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="onChangeRole(scope.row)"
                    >
                        修改权限
                    </el-button>
                </template>
            </el-table-column>
            
        </el-table>
        
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getRoleList } from '@/request/api';
import {InitData, ListInt} from "../type/role"
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router';
import 'element-plus/theme-chalk/index.css'
export default defineComponent({
    setup () {
        const data = reactive(new InitData())
        const router = useRouter()
        onMounted(()=>{
            getRoleList().then((res)=>{
                console.log(res)
                data.list = res.data.data
            })
        })
        const onAddRole = () => {
            console.log('actived')
            ElMessageBox.prompt('请输入角色名称', '添加角色', {
                confirmButtonText: '添加',
                cancelButtonText: '取消',
            })
            .then(({ value }) => {
                if(value){
                data.list.push({
                    roleId: data.list.length + 1,
                    authority: [],
                    roleName: value
                })
                }
                ElMessage({
                type: 'success',
                message: `${value}角色添加成功`,
                })
            })
            .catch(() => {
                ElMessage({
                type: 'info',
                message: '输入失败',
                })
            })
        }
        // 修改权限
        const onChangeRole = (row:ListInt) => {
            console.log(row)
            router.push({
                // path: "authority",
                // query: {
                // id: row.roleId,
                // authority: row.authority.join(",")
                // }
                name: "authority",
                params: {
                  id: row.roleId,
                  authority: row.authority
                }
            })
        }
        
        return {...toRefs(data),onAddRole,onChangeRole}
    }
})
</script>

<style scoped>
  .search-form{
    padding: 10px 0 0 10px;
  }
</style>
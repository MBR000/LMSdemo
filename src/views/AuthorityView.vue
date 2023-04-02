<template>
    <div>
        <el-tree
            ref="treeRef"
            :data="list"
            show-checkbox
            node-key="roleId"
            :default-checked-keys="authority"
            :props="{
                children: 'roleList',
                label: 'name',
            }"
        />
        <el-button type="primary" @click="changeAuthority()">更改权限</el-button>
    </div>
</template>

<script lang="ts">
import { InitData } from '@/type/authority';
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import { getAuthorityList } from '@/request/api';
export default defineComponent({
    setup () {
        const router = useRoute()
        const params:any = router.params
        const data = reactive(new InitData(params.id,params.authority))
        onMounted(()=>{
            getAuthorityList().then((res)=>{
                console.log(res)
                data.list = res.data.data
            })
        })
        const changeAuthority = ()=>{
            console.log(data.treeRef.getCheckedKeys().sort((a:number,b:number)=>a-b))
        }
        return {...toRefs(data),changeAuthority}
    }
})
</script>

<style scoped>

</style>
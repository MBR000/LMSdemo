import axios from "axios"
// 创建axios实例
const baseURL = 'https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api'

const service = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        "Content-Type":"application/json;charset=utf-8"
    }
})

//请求拦截
service.interceptors.request.use((config)=>{
    config.headers = config.headers || {}
    if(localStorage.getItem('token')){
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
})

//响应拦截
service.interceptors.response.use((res)=>{
    console.log(res.data.code)
    let code:number = res.data.code
    if(code != 200){
        code = res.data.data.code
        if(code != 200)
            return Promise.reject(res)
    }//这里是接口有问题，有的时候是data外面套了个data
    return res
},(err)=>{
    console.log(err)
})

export default service
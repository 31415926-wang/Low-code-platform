import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
// import { useStore } from 'vuex' //会出现报错
import store from '@/store/index'
import { message } from 'ant-design-vue'

const requestInstance: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
})

requestInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // console.log('api请求拦截', config)
    const $store = store as any
    if ($store.state.userStore.token) {
        // 如果有token，添加
        config.headers!.Authorization = 'Bearer ' + $store.state.userStore.token
    }
    return config
}, (err: AxiosError) => Promise.reject(err))

requestInstance.interceptors.response.use((response: AxiosResponse) => {
    const $store = store as any
    // console.log('api响应拦截', response)
    // 如果是请求后响应为token过期、没有token
    // 清空token、个人信息。然后原地刷新页面
    if (response.data.errno === 101004) {
        console.log('出错101004')
        $store.commit('userStore/clearUser')
        location.reload()
        return
    }

    if (response.data.errno !== 0) {
        message.error('出错：' + response.data.message)
    }

    return response.data // 这里的data就是后端返回的ServeData<T>
}, (err: AxiosError) => {
    message.error('请求出错')
    return Promise.reject(err)
})

// 后台服务约好的返回结构
export type ServeData<T> = {
    errno: number,
    message: string,
    data: T
}

// 调用该方法，其实就是让实例去发请求。不直接调实例()，因为这样可以控制返回的数据结构
const request = <T>(config: AxiosRequestConfig) => {
    // console.log('断点1', config)

    return requestInstance.request<any, ServeData<T>>(config)
    /*   原应该等于AxiosResponse<ServeData<T>>，只是上面响应拦截器只保留了data内容，即后台返回的结果。
      这样一来可以接口返回的结果直接就是后端的返回内容
      ServeData<T>代表后台返回的数据结构 */
}
export default request

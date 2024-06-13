import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

const requestInstance: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
})

requestInstance.interceptors.request.use((config) => {
    // 如果有token，添加
    return config
}, (err: AxiosError) => Promise.reject(err))

requestInstance.interceptors.response.use((response: AxiosResponse) => {
    // console.log('api请求响应拦截', response)

    return response.data
}, (err: AxiosError) => Promise.reject(err))

// 后台服务返回的数据
type ServeData<T> = {
    code: number,
    message: string,
    data: T
}

// 调用该方法，其实就是让实例去发请求。不直接调实例()，因为这样可以控制返回的数据结构
const request = <T>(config: AxiosRequestConfig) => {
    return requestInstance.request<any, ServeData<T>>(config)
    /*   原应该等于AxiosResponse<ServeData<T>>，只是上面响应拦截器只保留了data内容，即后台返回的结果。
      这样一来可以接口返回的结果直接就是后端的返回内容
      ServeData<T>代表后台返回的数据结构 */
}
export default request

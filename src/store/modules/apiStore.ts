/*
    存储api的路径，此类api不需要自己通过axios实例发请求，
    通常是UI库直接用的请求路径，如前端显示后端的图片、封装的文件上传
*/
import type { Module } from 'vuex'
import type { apiState } from '@/type/store/modules/apiStore'

const baseUrl = process.env.VUE_APP_BASE_URL
const staticUrl = process.env.VUE_APP_STATIC_URL

const apiStore: Module<apiState, any> = {
    namespaced: true,
    state: {
        // fileUploadApi: baseUrl + '/upload',
        // imgEchoApi: baseUrl + '/qsImgs/'
        fileUploadApi: baseUrl + '/api/utils/upload-img',
        imgEchoApi: staticUrl + '/qsImgs/'
    }
}

export default apiStore

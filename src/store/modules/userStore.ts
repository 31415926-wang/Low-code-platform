import { userStore } from '@/type/store/modules/userStore'
import { Module } from 'vuex'
import { reqLoginByPhoneNumber, reqUserInfo } from '@/api/user/index'
import { PhoneLoginParams, UserInfo } from '@/type/api/user'
import { message } from 'ant-design-vue'
import { reqUpdateGist } from '@/api/common/index'

const userStore: Module<userStore, any> = {
    namespaced: true,
    state: {
        rememberUser: undefined,
        userInfo: {} as UserInfo,
        token: ''
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        clearUser(state) {
            state.token = ''
            state.userInfo = {} as UserInfo
            // 设置token
            reqUpdateGist('empty')
        },
        setUserInfo(state, data: UserInfo) {
            state.userInfo = data
        }
    },
    actions: {
        async phoneLogin(actions, params: PhoneLoginParams) {
            const { phoneNumber, veriCode } = params
            // 登录接口
            const result = await reqLoginByPhoneNumber({
                phoneNumber, veriCode
            })
            if (result.errno === 101006) {
                return Promise.reject('验证码不正确')
            } else {
                // 存储token，跳转首页或者原来要去的路径
                actions.commit('setToken', result.data.token)
                // gist设置token
                reqUpdateGist(result.data.token)
                message.success('登录成功，2s后跳转！')
            }
        },
        async getUserInfo(actions) {
            const result = await reqUserInfo()
            console.log('请求用户信息', result.data)
            actions.commit('setUserInfo', result.data)
        },
        async loginOut(actions) {
            await actions.commit('clearUser')
            actions.commit('clearUser')
            message.success('登出账号成功！')
            location.reload()
        }
    }
}

export default userStore

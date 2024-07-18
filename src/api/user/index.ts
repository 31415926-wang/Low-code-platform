
import request from '@/utils/request'
import { AccountLoginParams, AccountLoginResult, PhoneLoginParams, UserInfo, UpdateUserInfo } from '@/type/api/user'

enum Url {
    GetVeriCode = '/api/users/genVeriCode',
    LoginByPhoneNumber = '/api/users/loginByPhoneNumber',
    LoginUrl = '/login',
    GetUserInfo = '/api/users/getUserInfo',
    UpdateUserInfo = '/api/users/updateUserInfo'
}

// 获取验证码
export const reqGetVeriCode = (phoneNumber: string) => {
    return request<null>({
        url: Url.GetVeriCode,
        method: 'post',
        data: {
            phoneNumber
        }
    })
}

// 手机号登录
export const reqLoginByPhoneNumber = (data: PhoneLoginParams) => {
    return request<{
        token: string
    }>({
        url: Url.LoginByPhoneNumber,
        method: 'post',
        data
    })
}

// 账号密码登录
export const reqLogin = (data: AccountLoginParams) => {
    return request<AccountLoginResult>({
        url: Url.LoginUrl,
        method: 'post',
        data
    })
}

// 获取用户信息
export const reqUserInfo = () => {
    return request<UserInfo>({
        url: Url.GetUserInfo,
        method: 'get'
    })
}

// 更新用户信息
export const updateUserInfo = (data: UpdateUserInfo) => {
    return request({
        url: Url.UpdateUserInfo,
        method: 'PATCH',
        data
    })
}

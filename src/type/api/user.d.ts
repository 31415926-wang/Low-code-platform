
// 手机号登录
export interface PhoneLoginParams {
    phoneNumber: string,
    veriCode: string
}

// 账号登录相关
export interface AccountLoginResult {
    token: string
}

export interface AccountLoginParams {
    username: string,
    password: string
}

// 用户详细信息
export interface UserInfo {
    createdAt: string
    id: number
    nickName: string
    phoneNumber: string
    role: string
    type: string
    updatedAt: string
    username: string,
    picture: string
}

// 更新用户的参数
export interface UpdateUserInfo {
    gender: number
    nickName: string
    picture: string
}

import { UserInfo } from '@/type/api/user'

export interface userStore {
    rememberUser?: {
        username: string,
        password: string
    }
    userInfo: UserInfo,
    token: string
}

export interface loginMutationParams {
    username: string;
    password: string;
    remember: boolean;
}

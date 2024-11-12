<template>
    <div class="user-center ">
        <div class="title">
            个人中心
            <UserOutlined />
        </div>

        <a-form :model="formState" name="basic" autocomplete="off" layout="vertical">
            <a-form-item label="头像" name="picture">
                <div class="picture-row">
                    <FilesUpload :successCallback="successCallback">
                        <div class="img-echo">
                            <img v-if="hasImg" :src="(formState.picture).replace('https','http')" class="img" alt="">
                            <div v-else class="img"></div>
                        </div>
                    </FilesUpload>
                </div>
            </a-form-item>
            <a-form-item label="昵称" name="nickName" :rules="[{ required: true, message: '请输入昵称!' }]">
                <a-input v-model:value="formState.nickName">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" style="opacity: 0.6;" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="性别" name="gender" :rules="[{ required: true, message: '请选择性别!' }]">
                <a-radio-group v-model:value="formState.gender">
                    <a-radio-button :value="1">男</a-radio-button>
                    <a-radio-button :value="0">女</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item>
                <div class="bt-row">
                    <a-button type="primary" @click="submit">更新资料</a-button>
                    <a-button type="ghost" @click="goHome" style="margin-left: 10px;">返回首页</a-button>
                </div>
            </a-form-item>
        </a-form>

    </div>
</template>

<script setup lang='ts'>
import { reactive, computed } from 'vue'
import { useStore } from '@/store/index'
import { UpdateUserInfo } from '@/type/api/user'
import { useRouter } from 'vue-router'
import { updateUserInfo } from '@/api/user/index'
import { message } from 'ant-design-vue'

const $store = useStore()
const $router = useRouter()

const { nickName, picture = '' } = $store.state.userStore.userInfo

const formState = reactive<UpdateUserInfo>({
    gender: 0,
    nickName,
    picture
})

const hasImg = computed(() => {
    return formState.picture.length !== 0
})

const successCallback = (param: string | { urls: string[] }) => {
    if (typeof param !== 'string') {
        formState.picture = param.urls[0]
        message.success('上传头像成功!')
    }
}

const goHome = () => {
    $router.push('/')
}
const submit = async () => {
    await updateUserInfo(formState)
    message.success('修改个人资料成功!')
    // 清空个人资料
    $store.commit('userStore/setUserInfo', {})
    goHome()
}

</script>

<style scoped lang='scss'>
.user-center {
    margin: 0 auto;
    width: 25%;

    .title {
        padding: 30px 0 35px 0;
        font-size: 22px;
        text-align: center;

    }

    .picture-row {
        display: flex;
        justify-content: center;

        .img-echo {
            overflow: hidden;
            border-radius: 50%;
            border: 2px dotted rgba(126, 126, 126, 0.486);
            padding: 10px;
            cursor: pointer;

            .img {
                border-radius: 50%;
                border: 1px dashed rgba(126, 126, 126, 0.486);
                width: 130px;
                height: 130px;
            }

            &:hover {
                border-color: $theme_color;
            }
        }
    }

    .bt-row {
        text-align: center;
        margin-top: 20px;
    }

}

::v-deep() .ant-form-item .ant-form-item-label>label {
    font-size: 15px
}

::v-deep() .ant-form-item {
    margin-bottom: 20px;
}

::v-deep() .ant-radio-button-wrapper:first-child {
    border-radius: 15px 0 0 15px;
}

::v-deep() .ant-radio-button-wrapper:last-child {
    border-radius: 0 15px 15px 0;
}

::v-deep() .ant-btn {
    border-radius: 20px;
}

::v-deep() .ant-input-affix-wrapper {
    border-radius: 15px;
}
</style>

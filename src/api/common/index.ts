import request from '@/utils/request'
import axios from 'axios'

enum URL {
    UploadUrl = '/upload',
    UploadImg = '/api/utils/upload-img'
}

// 本地上传文件
export const reqUploadFile = (file: FormData) => {
    return request<string>({ // 这里只关注返回后台返回数据的data结构即可
        url: URL.UploadUrl,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: file
    })
}

// 线上上传图片
export const reqUploadImg = (data) => {
    return request<string | { urls: string[] }>({
        url: URL.UploadImg,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

export const reqGetGithubToken = () => {
    return axios.get('https://api.github.com/gists/267a2d0976263475044c901ba14bb205')
}

// 获取gist
export const reqGetGist = () => {
    return axios.get('https://api.github.com/gists/267a2d0976263475044c901ba14bb205', {
        headers: {
            Authorization: 'token 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',
            'Content-Type': 'application/json'
        }
    })
}

// 修改gist
export const reqUpdateGist = (content) => {
    console.log('reqUpdateGist', content)

    const url = 'https://api.github.com/gists/267a2d0976263475044c901ba14bb205'
    const data = {
        files: {
            mylogin: { // 替换为你的文件名
                content
            }
        }
    }

    return axios.patch(url, data, {
        headers: {
            Authorization: 'token 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',
            'Content-Type': 'application/json'
        }
    })
}

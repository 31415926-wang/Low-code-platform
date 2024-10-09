import request from '@/utils/request'

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

export const reqTest = () => {
    return request({
        url: 'test',
        method: 'get'
    })
}

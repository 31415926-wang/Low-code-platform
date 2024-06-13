import request from '@/utils/request'

enum URL {
    UploadUrl = '/upload'
}

// 上传文件
export const reqUploadFile = (file: FormData) => {
    return request<string>({
        url: URL.UploadUrl,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: file
    })
}

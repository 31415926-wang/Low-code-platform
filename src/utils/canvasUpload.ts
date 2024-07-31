
// 封装：将canvas转blod，再上传为图片给后台，后台返回回显url
import { reqUploadImg } from '@/api/common/index'

export default function canvasUpload(canvas: HTMLCanvasElement) {
    return new Promise<{ urls: string[] }>((resolve, reject) => {
        canvas.toBlob(async (blob) => {
            const formData = new FormData()
            formData.append('file-upload', blob!, new Date().getTime() + '.png')
            try {
                const result = await reqUploadImg(formData)
                if (typeof result.data !== 'string') {
                    resolve(result.data)
                }
            } catch (error) {
                reject('error')
            }
        })
    })
}

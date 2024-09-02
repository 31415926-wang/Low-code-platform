import axios from 'axios'

const onDownload = async (title: string, url: string) => {
    const aDom = document.createElement('a')
    // aDom.href = 'http://localhost:8080/img/appBg.86ac577b.svg' // 同源，可以直接下载
    // aDom.href = 'http://localhost:8888/qsImgs/1720576687027_blob-img.png' // 不同源且没处理跨域，会直接打开图片(已处理跨域的可以直接下载)
    // aDom.href = 'https://bpic.wotucdn.com/16/62/60/16626071-795efb5b5cc5110320b75e3fbbcda7e7.jpg!/quality/91/unsharp/true/compress/true/watermark/url/bG9nby53YXRlci52MTAucG5n/repeat/true/rotate/auto/fw/320/clip/320x556a0a0/format/webp'
    // 不同源, 且没处理跨域，一部分只能直接打开图片
    console.log('参数', url)
    aDom.href = url
    aDom.download = title + '.' + url.split('.').pop()
    aDom.target = '_blank' // 隐式设置aDom.rel = 'noopener' // web安全

    let tempUrl

    // 希望不同源，也能直接下载图片
    if (aDom.origin !== location.origin) {
        // 发请求获取图片内容，在内存中临时链接，不会压缩图片，出现频率高
        // 请求资源似乎部分不同源也可以请求到（未知，可能是浏览器对静态资源放宽）
        try {
            const result = await axios.get(aDom.href, {
                responseType: 'blob' // 处理二进制数据
            })
            tempUrl = URL.createObjectURL(result.data)
            console.log('非同源，请求下载图片', result.data)
            aDom.href = tempUrl
        } catch (error) {
            // 不同源，且没有服务端没有处理（或者前端没有设置该跨域代理），一部分无法请求。则只能打开图片。
            console.log('非同源，且无法请求下载图片')
        }
    }
    aDom.click()

    if (tempUrl) {
        URL.revokeObjectURL(tempUrl)
    }
}

export default onDownload

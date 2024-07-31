import { message } from 'ant-design-vue'
export default function (content: string) {
    const inputDom = document.createElement('input')
    document.body.appendChild(inputDom)
    inputDom.style.opacity = '0'
    inputDom.value = content
    inputDom.select()
    const result = document.execCommand('copy')
    if (result) {
        message.success('成功复制到剪贴板!')
    } else {
        message.info('复制失败!')
    }
    document.body.removeChild(inputDom)
}

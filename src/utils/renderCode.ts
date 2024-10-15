import QRCode from 'qrcode'

const renderCode = (id: string, url: string, callBack?: () => void) => {
    const canvas = document.getElementById(id)
    QRCode.toCanvas(canvas, url, function (error) {
        if (error) console.error(error)
        // console.log('success!')
        callBack && callBack()
    })
}

export default renderCode

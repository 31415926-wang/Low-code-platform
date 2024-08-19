// import { useStore } from '@/store/index'

export default function () {
    // const $store = useStore()
    const getDefaultImg = () => {
        return require('@/assets/image/defaultImg.png')
    }
    const getImgSrc = (srcValue: string) => {
        // return srcValue.length !== 0
        //     ? $store.state.apiStore.imgEchoApi + srcValue
        //     : getDefaultImg()
        return srcValue.length !== 0
            ? srcValue
            : getDefaultImg()
    }
    return {
        getImgSrc
    }
}

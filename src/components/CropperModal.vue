<template>
    <slot></slot>
    <a-modal :open="$props.showModal" @update:open="$emit('update:showModal', $event)" :maskClosable="false"
        title="裁剪图片" @ok="handleOk">
        <div>
            <!-- <img id="cropper-image" :src="showImgSrc"> -->
            <img id="cropper-image" :src="original">
        </div>
    </a-modal>
</template>
<script lang="ts" setup>
import { ref, computed, nextTick, watch } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import useDefaultImg from '@/hook/useDefaultImg'
import { reqUploadFile } from '@/api/common/index'

// 回显图片
const { getImgSrc } = useDefaultImg()
const showImgSrc = computed(() => {
    return getImgSrc($props.imgSrc)
})

const $props = defineProps<{
    showModal: boolean,
    imgSrc: string,
    // eslint-disable-next-line
    successCallback?: (param: string) => void
}>()
// eslint-disable-next-line
const $emit = defineEmits<{
    (e: 'update:showModal', param: boolean): void
}>()

// 初始的裁剪原图，不刷新页面就不会丢失
const original = ref(showImgSrc.value)

let cropper
watch(() => $props.showModal, (newVal: boolean) => {
    if (newVal) handleCropper()
    else cropper.destroy()
})

const handleCropper = async () => {
    await nextTick()
    const cropperImage = document.getElementById('cropper-image') as HTMLCanvasElement
    cropper = new Cropper(cropperImage, {
        aspectRatio: 16 / 9,
        crop(event) {
            console.log('裁剪', event)
        }
    })
}

const handleOk = async () => {
    /*
    cropper.getCroppedCanvas()：获取画布元素

    两种将画布元素转换格式的方法：
     HTMLCanvasElement：toBlob() 方法
     HTMLCanvasElement：toDataURL() 方法，转换生成的 base64 数据，可直接访问（方便，但质量不高）

    文件数据格式：
     Blob（二进制大对象）和 File 是两种用于处理二进制数据的常见对象类型
     File 是 Blob 的子类： File 对象继承了 Blob 对象的所有方法和属性，并增加了一些文件相关的属性，如文件名、最后修改时间等。

     */
    cropper.getCroppedCanvas().toBlob((blob: Blob) => {
        const formData = new FormData()

        // 前端指定好文件名与后缀，修复后端无法识别图片bug
        // formData.append('file-upload', new File([blob], 'blob-img.png'))
        formData.append('file-upload', blob, 'blob-img.png') // 前端指定好文件名与后缀，修复后端无法识别图片bug

        /*
        当使用 console.log 打印 FormData 对象时，通常会发现无法直接看到 FormData 对象的内容。这是因为 FormData 对象的数据结构比较特殊
            for (const pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1])
            }
        */
        reqUploadFile(formData).then((result) => {
            $props.successCallback && $props.successCallback(result.data)
            $emit('update:showModal', false)
        })
    })
}

</script>

<style>
/* Make sure the size of the image fits perfectly into the container */
img {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
}
</style>

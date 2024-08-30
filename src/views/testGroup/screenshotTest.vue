<template>
    <div class="layout">
        <div class="content">
            <div class="border" style="color: red;border: 1px solid red;">
                模拟的作品内容
                this is content
            </div>
        </div>
        <button @click="handleScreenshot">截图</button>
        <div class="cutContent">
        </div>
    </div>

</template>

<script setup lang='ts'>

// 模拟选择指定的目标选择器DOM，将其截图成canvas，并显示。
const handleScreenshot = () => {
    const selector = '.content'
    const goalDom = document.querySelector(selector)

    // 嵌入样式：略，即将style标签插入foreignObject中。

    const svgData = `<svg  width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <foreignObject width="100%" height="100%">
                            <div xmlns="http://www.w3.org/1999/xhtml"> ${goalDom?.innerHTML}</div>
                        </foreignObject>
                    </svg>`
    // XML 命名空间缺少将不显示标签内容

    // const svgDataBold = new Blob([svgData], { type: 'text/html;charset=utf-8' })
    const svgDataBold = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const img = document.createElement('img')
    img.src = URL.createObjectURL(svgDataBold)
    console.log('实验', img)

    img.onload = function () {
        const canvas = document.createElement('canvas')
        const canvasContent = canvas.getContext('2d')
        canvasContent!.drawImage(img, 0, 0)
        document.querySelector('.cutContent')?.appendChild(canvas)
    }
}
</script>

<style scoped lang='scss'>
.layout {
    display: flex;
    justify-content: space-around;
    align-items: center
}

.content {
    width: 300px;
    height: 300px;

    &>div {
        width: 300px;
        height: 300px;
        background-color: aquamarine;
    }
}
</style>

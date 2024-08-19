<template>
    <div class="out border">
        <iframe :src="iframeUrl" frameborder="0" sandbox="allow-scripts allow-same-origin"></iframe>
    </div>
</template>

<script setup lang='ts'>
const iframeUrl = process.env.VUE_APP_BUILD_URL + '/edit/8600'

</script>

<style scoped lang='scss'>
.out {
    margin: 10px auto;
    height: 667px;
    width: 500px;
}

iframe {
    width: 100%;
    height: 100%;
}
</style>

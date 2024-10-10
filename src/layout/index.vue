<template>
    <div class="container">
        <div class="heard">

            <Head></Head>
        </div>
        <div class="main">
            <Main></Main>
        </div>
        <!-- <div class="border footer">
            <Footer></Footer>
        </div> -->
    </div>
</template>

<script setup lang='ts'>
import Head from './head.vue'
import Main from './main.vue'
// import Footer from './footer.vue'
/* 或者使用内联的方式 */
// import imageUrl from '@/assets/image/appBg.svg'
</script>

<style scoped lang='scss'>
$box_padding: 16px 20px;

.container {
    /* 线上会找不到，所以用相对路径 */
    background: url('../assets/image/appBg.svg');
    background-size: cover;
    height: 100%;
    overflow: auto;

    .heard {
        height: $head_height;
        padding: $box_padding;
        box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);

        &>* {
            height: 100%;
        }
    }

    .main {
        // height: calc(100% - $head_height - $footer_height - 2px);
        height: calc(100% - $head_height - 2px);
        // max-height: calc(100% - $head_height  - 2px);
        // padding: $box_padding;
        padding: 12px 20px;
        ;
        padding-bottom: 0;
        overflow: hidden;

    }

    .footer {
        height: $footer_height;
    }

}
</style>

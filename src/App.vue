<template>
  <a-config-provider :theme="themeConfig" :locale="zhcn">
    <router-view></router-view>
  </a-config-provider>
</template>
<script setup lang='ts'>
import zhcn from 'ant-design-vue/es/locale/zh_CN' // 配置中文

// 引入自定义的全局主题配置对象
import themeConfig from '@/style/theme'
</script>
<style></style>

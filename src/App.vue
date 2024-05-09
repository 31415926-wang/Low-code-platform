<template>
  <a-config-provider :theme="themeConfig">
    <router-view></router-view>
  </a-config-provider>
</template>
<script setup lang='ts'>
// 引入自定义的全局主题配置对象
import themeConfig from '@/style/theme'
</script>
<style></style>

<template>
  <a-modal v-model:open="openPanel" :width="520" :footer="null" title="发布成功" @ok="openPanel = false">
    <div class="model-inner">
      发布面板
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const openPanel = ref<boolean>(false)

defineExpose({
  openPanel
})
</script>

<style lang="scss" scoped>
.model-inner {
  padding: 15px 26px 10px;

}
</style>

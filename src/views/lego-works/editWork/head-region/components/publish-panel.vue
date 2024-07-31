<template>
  <a-modal v-model:open="openPanel" :width="820" :footer="null" title="发布成功" @ok="openPanel = false">
    <div class="model-inner">
      <div class="left">
        <div>封面图</div>
        <img class="border cover" :src="pageDate.coverImg" alt="封面" v-if="pageDate.coverImg">
        <div class="border cover" v-else>未上传封面<a-button class="to-upload-bt" @click="toUploadImg">去上传</a-button></div>
      </div>
      <div class="right">
        <div class="text-info">
          <div class="title">{{ pageDate.title }}</div>
          <div class="desc">{{ pageDate.desc }}</div>
        </div>
        <a-tabs v-model:activeKey="activeKey" type="card" @change="changeTab">
          <a-tab-pane :key="1" tab="发布为作品">
            <div class="tabPane">
              <canvas id="canvas-work" class="code"></canvas>
              <div>
                <div class="code-type">默认渠道</div>
                <div class="input-code">
                  <a-input v-model:value="codeUrlWork" />
                  <a-button shape="round" @click="onCopy(1)">复制</a-button>
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane :key="2" tab="发布为模版">
            <div class="tabPane">
              <canvas id="canvas-template" class="code"></canvas>
              <div>
                <div class="code-type">模版详细</div>
                <div class="input-code">
                  <a-input v-model:value="codeUrlTemplate" />
                  <a-button shape="round" @click="onCopy(2)">复制</a-button>
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useStore } from '@/store/index'
import QRCode from 'qrcode'
import copyText from '@/utils/copyText'

const $props = defineProps<{
  openSettingPanel: () => void
}>()

const $store = useStore()

const activeKey = ref(1)
const openPanel = ref<boolean>(false)
const codeUrlWork = ref('http://10.23.103.244:8080/work')
const codeUrlTemplate = ref('http://10.23.103.244:8080/template')

const pageDate = computed(() => {
  return $store.state.editorStore.page
})

const toUploadImg = () => {
  $props.openSettingPanel()
  openPanel.value = false
}

const changeTab = async (activeKey: number) => {
  await nextTick(() => {
    if (activeKey === 1) {
      renderCode('canvas-work', codeUrlWork.value)
    } else {
      renderCode('canvas-template', codeUrlWork.value)
    }
  })
}

const renderCode = (id: string, url: string, callBack?: () => void) => {
  const canvas = document.getElementById(id)
  QRCode.toCanvas(canvas, url, function (error) {
    if (error) console.error(error)
    // console.log('success!')
    callBack && callBack()
  })
}

enum targetType {
  copyWork = 1,
  copyTemplate = 2
}

const onCopy = (type: targetType) => {
  if (type === targetType.copyWork) {
    copyText(codeUrlWork.value)
  } else {
    copyText(codeUrlTemplate.value)
  }
}

defineExpose({
  openPanel,
  changeTab
})
</script>

<style lang="scss" scoped>
.border {
  border-color: rgba(231, 231, 231, 0.1);
}

.model-inner {
  padding: 15px 0px 10px;
  display: flex;
  gap: 45px;

  .left {
    width: 30%;

    .cover {
      width: 100%;
      height: 360px;
      text-align: center;
      line-height: 360px;
    }

    .to-upload-bt {
      margin-left: 6px;
    }
  }

  .right {
    width: 62%;

    .text-info {
      margin-bottom: 50px;

      .title {
        font-size: 18px;
      }

      .desc {
        margin-top: 10px;
        opacity: 0.8;
      }
    }

    .tabPane {
      display: flex;
      gap: 15px;
      align-items: center;

      .code-type {
        margin-bottom: 10px;
      }

      .input-code {
        display: flex;
        gap: 1px;

        .ant-input {
          border-radius: 32px;
        }
      }

      .code {
        width: 90px;
        height: 90px;
      }
    }
  }
}

::v-deep() .ant-tabs-nav .ant-tabs-tab {
  font-size: 14px !important;
  border-radius: 20px 20px 0 0 !important;
}
</style>

<template>
  <a-modal v-model:open="openPanel" :width="width > 768 ? 820 : 330" :footer="null" title="发布成功"
    @ok="openPanel = false">
    <div class="model-inner">
      <div class="left">
        <img class="border cover" :src="pageDate.coverImg" alt="封面" v-if="pageDate.coverImg">
        <div class="border cover" v-else>未上传封面<a-button class="to-upload-bt" @click="toUploadImg">去上传</a-button></div>
        <div class="text-tip">作品封面图</div>
      </div>
      <div class="right">
        <div class="text-info">
          <div class="title">作品名称：{{ pageDate.title }}</div>
          <div class="desc" v-show="pageDate.desc && pageDate.desc.length > 0">作品描述：{{ pageDate.desc }}</div>
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
            <hr>
            <div class="publish-template">
              <a-button type="primary" @click="onDownload(pageDate.title, pageDate.coverImg)">下载图片海报</a-button>
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
            <hr>
            <div class="publish-template">
              <a-button type="primary" @click="onPublishTemplate">发布为模版</a-button>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from 'vue'
import { useStore } from '@/store/index'
import QRCode from 'qrcode'
import copyText from '@/utils/copyText'
import { reqPublishTemplate } from '@/api/works/workItem'
import { message } from 'ant-design-vue'
import onDownload from '@/utils/downloadFile'
import { useRouter } from 'vue-router'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const $props = defineProps<{
  openSettingPanel: () => void
}>()

const $router = useRouter()
const $store = useStore()
const location = window.location

const activeKey = ref(1)
const openPanel = ref<boolean>(false)
const codeUrlWork = ref('')
const codeUrlTemplate = ref('')

const pageDate = computed(() => {
  return $store.state.editorStore.page
})

const urlPre = computed(() => {
  const isHash = $router.options.history.base.includes('#')
  // console.log('环境变量', process.env.VUE_APP_PublicPath)
  return process.env.VUE_APP_PublicPath! + (isHash ? '/#' : '')
})

const toUploadImg = () => {
  $props.openSettingPanel()
  openPanel.value = false
}

const changeTab = async (activeKey: number) => {
  // console.log('changeTab')
  if (!codeUrlWork.value) codeUrlWork.value = `${location.origin}${urlPre.value}/previewWork/${$store.state.editorStore.page.id}`
  if (!codeUrlTemplate.value) codeUrlTemplate.value = `${location.origin}${urlPre.value}/previewTemplate/${$store.state.editorStore.page.id}`
  await nextTick(() => {
    if (activeKey === 1) {
      renderCode('canvas-work', codeUrlWork.value)
    } else {
      renderCode('canvas-template', codeUrlTemplate.value)
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

const onPublishTemplate = async () => {
  await reqPublishTemplate(pageDate.value.id)
  message.success('发布模版成功!')
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

<style>
@media screen and (max-width:768px) {
  .ant-modal {
    top: 50px !important;
  }
}
</style>
<style lang="scss" scoped>
.border {
  border-color: rgba(231, 231, 231, 0.8);
}

/* 修复手机端排版 */

@media screen and (max-width:768px) {

  .model-inner {
    flex-direction: column-reverse;

    .left,
    .right {
      width: 100% !important;
    }

    .right .tabPane .input-code {
      display: block !important;
    }
  }

  .code {
    width: 108px !important;
    height: 108px !important;
  }
}

.model-inner {
  padding: 15px 0px 10px;
  display: flex;
  gap: 45px;

  .left {
    width: 36%;

    .cover {
      width: 100%;
      height: 360px;
      text-align: center;
      line-height: 360px;
      object-fit: contain;
    }

    .to-upload-bt {
      margin-left: 6px;
    }

    .text-tip {
      text-align: center;
      font-size: 12px;
      opacity: 0.8;
    }
  }

  .right {
    width: 64%;

    hr {
      opacity: 0.4;
    }

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

    .publish-template {
      display: flex;
      justify-content: end;
    }
  }
}

::v-deep() .ant-tabs-nav .ant-tabs-tab {
  font-size: 14px !important;
  border-radius: 20px 20px 0 0 !important;
}
</style>

<style lang="scss">
.ant-modal-title {
  color: $theme_color !important;
  font-size: 18px;
}
</style>

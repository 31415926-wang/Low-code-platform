<template>
    <div class="card-container">
        <div class="card">
            <div class="img-container">
                <div class="img-box" :style="{ backgroundImage: `url(${cardItem.coverImg})` }">
                </div>
                <div class="mask">
                    <a-button type="primary" shape="round" v-if="!isTemplate"
                        @click="editWork(cardItem.id)">编辑作品</a-button>
                    <a-button type="primary" shape="round" v-else
                        @click="toDetailTemplate(cardItem.id)">查看模版详细</a-button>
                </div>
            </div>
            <div class="card-title">
                <span class="title">
                    {{ cardItem.title }}
                </span>
                <span class="mount" v-if="!isTemplate">
                    <UserOutlined />&nbsp;{{ cardItem.copiedCount }}
                </span>
            </div>
            <div class="info-group" v-if="!isTemplate">
                <div @click="editWork(cardItem.id)">
                    <FormOutlined />
                </div>
                <div class="operate ">
                    <EllipsisOutlined />
                    <div class="operate-box">
                        <ul class="">
                            <li @click="copyWork(cardItem.id)">
                                <CopyOutlined /> <span>复制</span>
                            </li>
                            <li @click="showDeleteConfirm(cardItem.id)">
                                <DeleteOutlined /> <span>删除</span>
                            </li>
                            <li @click="onDownload(cardItem.title, cardItem.coverImg)">
                                <DownloadOutlined /> <span>下载封面</span>
                            </li>
                            <li @click="openDonateWork(cardItem.id)">
                                <GiftOutlined /> <span>转赠</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-else class="card-title" style="opacity:0.6">
                <div>作者： {{ cardItem.author }}</div>
                <div>
                    <UserOutlined />&nbsp;{{ cardItem.copiedCount }}
                </div>
            </div>
        </div>
        <div class="msg" :class="cardItem.isHot ? 'hot' : 'publish'" v-if="cardItem.isHot || cardItem.isPublish">
            {{ cardItem.isHot ? 'HOT' : '已发布' }}
        </div>

    </div>

    <donateModal ref="donateModalRef"></donateModal>
</template>

<script setup lang='ts'>
import { WorkItem } from '@/type/api/work'
import { ref, createVNode, inject } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { Modal, message } from 'ant-design-vue'
import { reqCopyWork, reqDeleteWork } from '@/api/works/workItem'
import donateModal from './donateModal.vue'
import { useRouter } from 'vue-router'
import onDownload from '@/utils/downloadFile'

defineProps<{
    cardItem: WorkItem,
    isTemplate?: boolean
}>()

const $router = useRouter()
const donateModalRef = ref()

const showDeleteConfirm = (id: number) => {
    Modal.confirm({
        title: '确定删除该作品吗？',
        icon: createVNode(ExclamationCircleOutlined),
        content: '删除后的作品将移入回收站',
        okText: '确定',
        okType: 'primary',
        cancelText: '取消',
        onOk() {
            deleteWork(id)
        },
        onCancel() {
            console.log('Cancel')
        }
    })
}

const copyWork = async (id: number) => {
    const result = await reqCopyWork(id)
    if (result.errno === 0) {
        message.success('复制作品成功')
    }
}
const deleteWork = async (id: number) => {
    await reqDeleteWork(id)
    message.success('删除作品成功')
    // 跨级刷新列表
    updateListFn()
}

const openDonateWork = (id: number) => {
    donateModalRef.value.openDonate = true
    donateModalRef.value.formState.id = id
    donateModalRef.value.formState.username = ''
}

const toDetailTemplate = (id: number) => {
    $router.push('/home/look-template/' + id)
}

const editWork = (id: number) => {
    $router.push('/edit-work/' + id)
}

const updateListFn = inject('updateList') as () => void

</script>

<style scoped lang='scss'>
.card-container {
    position: relative;

    .msg {
        position: absolute;
        top: -7px;
        left: -7px;
        border-radius: 10px;
        border: 1px solid;
        padding: 3px 6px;
        font-size: 13px;

        &.publish {
            color: #52c41a;
            background: #f6ffed;
            border-color: #b7eb8f;
        }

        &.hot {
            color: red;
            background: #fff4ed;
            border-color: red;
        }
    }
}

.card {
    position: relative;
    grid-column: span 1 / span 1;
    background-color: white;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 3px 5px 9px rgb(202, 202, 202);

    .img-container {
        position: relative;
        overflow: hidden;

        &:hover .img-box {
            transform: scale(1.4);
            cursor: pointer;
        }

        &:hover .mask {
            display: flex;
        }

        .mask {
            display: none;
            position: absolute;
            inset: 0;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.486);
        }

        .img-box {
            height: 300px;
            background-size: cover;
            overflow: hidden;
            transition: 0.3s all;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .card-title {
        display: flex;
        justify-content: space-between;
        padding: 10px 10px;
        font-size: 15px;

        .title {
            max-width: 70%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .mount {
            opacity: 0.75;
        }
    }

    .info-group {
        display: flex;
        font-size: 12px;
        padding: 8px 0;
        background-color: #fafafa;
        // opacity: 0.7;

        &>div {
            display: flex;
            width: 50%;
            justify-content: center;

            ::v-deep() &:hover>.anticon svg {
                color: $theme_color;
            }
        }

        &>div:first-child {
            border-right: 1px solid rgb(226, 226, 226);
        }

        ::v-deep() .anticon svg {
            font-size: 16px;
            cursor: pointer;
            opacity: 0.7;
        }

        .operate {
            position: relative
        }

        .operate:hover {
            .operate-box {
                display: block;
            }
        }

        .operate-box {
            display: none;
            position: fixed;
            // top: 100%;
            // left: 10px;
            z-index: 20;

            ul {
                position: relative;
                bottom: 10px;
                left: 75px;;

                width: 120px;
                background-color: #fff;
                // border: 1px solid;
                font-size: 15px;
                cursor: pointer;

                & li {
                    padding: 4px 7px;
                    opacity: 0.85;

                    &:hover {
                        background-color: rgb(235, 218, 188);
                        color: $theme_color;
                    }
                }

                & span {
                    margin-left: 5px;
                }
            }
        }
        }
    }

    @media screen and (max-width:1550px) {
        .card .img-container .img-box {
            height: 300px;
        }
    }

    @media screen and (max-width:1280px) {
        .card .img-container .img-box {
            height: 250px;
        }
    }</style>

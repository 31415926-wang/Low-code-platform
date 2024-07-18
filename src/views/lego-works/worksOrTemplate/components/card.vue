<template>
    <div class="card-container">
        <div class="card">
            <div class="img-container">
                <div class="img-box" :style="{ backgroundImage: `url(${cardItem.coverImg})` }">
                </div>
                <div class="mask">
                    <a-button type="primary" shape="round">编辑作品</a-button>
                </div>
            </div>
            <div class="card-title">
                <span>
                    {{ cardItem.title }}
                </span>
                <span class="mount">
                    <UserOutlined />&nbsp;{{ cardItem.copiedCount }}
                </span>
            </div>
            <div class="info-group">
                <div>
                    <FormOutlined />
                </div>
                <div>
                    <EllipsisOutlined />
                </div>
            </div>
        </div>
        <div class="msg" :class="cardItem.isHot ? 'hot' : 'publish'" v-if="cardItem.isHot || cardItem.isPublish">
            {{ cardItem.isHot ? 'HOT' : '已发布' }}
        </div>
    </div>
</template>

<script setup lang='ts'>
import { WorkItem } from '@/type/api/work'

defineProps<{
    cardItem: WorkItem
}>()
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
            background-color: rgba(0, 0, 0, 0.686);
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

        .mount {
            opacity: 0.75;
        }
    }

    .info-group {
        display: flex;
        font-size: 12px;
        padding: 8px 0;
        background-color: #fafafa;
        opacity: 0.7;

        &>div {
            display: flex;
            width: 50%;
            justify-content: center;
        }

        &>div:first-child {
            border-right: 1px solid rgb(226, 226, 226);
        }

        ::v-deep() .anticon svg {
            font-size: 16px;
            cursor: pointer;
        }

        ::v-deep() .anticon svg:hover {
            color: $theme_color;
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
}
</style>

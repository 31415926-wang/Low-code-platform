<template>
    <div class="card-container">
        <div class="card">
            <div class="img-container">
                <a-skeleton-button class="img-box" :active="true" :block="true" />
            </div>
            <div class="card-title">
                <a-skeleton :active="true" :paragraph="{ rows: 1, width: '100%' }" />
            </div>
            <!-- <div class="info-group">
                <div>
                    <a-skeleton-button :active="true" :block="true" />
                </div>
                <div>
                    <a-skeleton-button :active="true" :block="true" />
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup lang='ts'>
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

        ::v-deep() .ant-skeleton-button {
            height: 100%;
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

        ::v-deep() .ant-skeleton-title+.ant-skeleton-paragraph {
            margin-block-start: 9px;
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

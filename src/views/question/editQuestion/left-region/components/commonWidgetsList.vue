<template>
    <div class="widget-template-box" v-for="(item, index) in defaultTemplate" :key="index">
        <h3>{{ item.label }}</h3>
        <a-row class="widget-type-box">
            <a-col :span="11" v-for="(widget, inIndex) in item.widgetList" :key="inIndex">
                <WidgetWrapper class="widget-item" :widget="widget">
                    <span class="icon-box flex-center">
                        <IconSvg :name='widget.icon'></IconSvg>
                    </span>
                    <h4 class="title">{{ widget.title }}</h4>
                </WidgetWrapper>
            </a-col>
        </a-row>
    </div>

    <!-- <pre>
        {{ defaultTemplate }}
    </pre> -->
</template>

<script setup lang='ts'>
import defaultTemplate from '@/widgets/defaultTemplate'
import WidgetWrapper from './widgetWrapper.vue'
// console.log('模版', defaultTemplate)

</script>

<style scoped lang='scss'>
.widget-type-box {
    gap: 10px;
    margin: 10px 0;

    .widget-item {
        display: flex;
        border-radius: 7px;
        background-color: rgba(255, 255, 255, 0.7);
        padding: 7px 0;
        text-align: center;

        .icon-box {
            width: 36%;
            padding: 3px 0;

            // 若是ant库的图标
            .anticon {
                height: 100%;
            }
        }

        .title {
            flex-grow: 1;
            font-size: 15px;
            // border: 1px solid blue;
        }
    }
}

::v-deep() svg {
    width: auto !important;
    height: 100% !important;
}
</style>

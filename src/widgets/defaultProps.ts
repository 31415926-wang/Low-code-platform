import { commonProps, textProps, imgProps, shapeProps } from '@/type/widgets/index'
import { pick, without } from 'lodash-es'
// 物料的props默认值

export const defaultCommonProps: commonProps = {
    tag: 'div',
    url: '',
    height: '',
    width: '',
    'padding-left': '0px',
    'padding-right': '0px',
    'padding-top': '10px',
    'padding-bottom': '10px',
    opacity: 1,
    // 海报模式下的布局
    position: 'absolute',
    top: '46px',
    left: '182px',
    'border-radius': '0',
    'border-color': '#000000',
    'border-style': 'solid',
    'border-width': '0',
    'background-color': 'transparent',
    'background-image': '',
    'box-shadow': '0px 0px 0px #fa541c',
    rotate: '0deg',
    scale: 1,
    // 'text-shadow': '0px 0px 0px'
    'text-shadow': 'none'
}

export const defaultTextProps: textProps = {
    'font-size': '16px',
    'font-family': '"SimSun","STSong"',
    'font-weight': 'normal',
    'font-style': 'normal',
    'line-height': 1,
    'text-align': 'left',
    color: '#000000'
}

export const defaultImgProps: imgProps = {
    src: ''
}

export const defaultShapeProps: shapeProps = {
    ...pick(defaultCommonProps, ['position', 'height', 'width', 'opacity', 'top', 'left', 'rotate', 'background-color'])
}

// 需要挂载在父级包裹层的样式key：定位相关的属性
export const parentWrapperStyleKeys = ['position', 'top', 'bottom', 'left', 'right', 'scale', 'rotate']
// 样式的key数组，物料样式会用到
export const commonStyleKeys = without(Object.keys(defaultCommonProps), 'url', 'tag', ...parentWrapperStyleKeys)

export const textStyleKeys = without(Object.keys(defaultTextProps), 'text').concat(commonStyleKeys)
export const imgStyleKeys = commonStyleKeys.concat(Object.keys(defaultImgProps))
export const shapeStyleKeys = without(Object.keys(defaultShapeProps), ...parentWrapperStyleKeys)

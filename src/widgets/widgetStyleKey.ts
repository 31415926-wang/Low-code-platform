import { pick, without } from 'lodash-es'
import {
    defaultCommonProps,
    defaultTextProps,
    defaultImgProps,
    defaultShapeProps
} from './defaultProps'

// 需要挂载在父级包裹层的样式key：定位相关的属性
export const parentWrapperStyleKeys = ['position', 'top', 'bottom', 'left', 'right', 'scale', 'rotate']
// 样式的key数组，物料样式会用到
export const commonStyleKeys = without(Object.keys(defaultCommonProps), 'url', 'tag', ...parentWrapperStyleKeys)
export const textStyleKeys = without(Object.keys(defaultTextProps), 'text').concat(commonStyleKeys)
export const imgStyleKeys = commonStyleKeys.concat(Object.keys(defaultImgProps))
export const shapeStyleKeys = without(Object.keys(defaultShapeProps), ...parentWrapperStyleKeys)

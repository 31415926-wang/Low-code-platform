import { commonProps, textProps, imgProps } from '@/type/widgets/index'
import { without } from 'lodash-es'
// 物料的props默认值

export const defaultCommonProps: commonProps = {
    tag: 'div',
    url: '',
    height: '',
    width: '100%',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '10px',
    paddingBottom: '10px',
    opacity: 1,
    // 海报模式下的布局
    position: 'absolute',
    top: '10%',
    left: '40%'
}

export const defaultTextProps: textProps = {
    fontSize: '16px',
    fontFamily: '"SimSun","STSong"',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 1,
    textAlign: 'left',
    color: 'black'
}

export const defaultImgProps: imgProps = {
    src: ''
}

// 需要挂载在父级包裹层的样式key：定位相关的属性
export const parentWrapperStyleKeys = ['position', 'top', 'bottom', 'left', 'right']
// 样式的key数组，物料样式会用到
export const commonStyleKeys = without(Object.keys(defaultCommonProps), 'url', 'tag', ...parentWrapperStyleKeys)
export const textStyleKeys = without(Object.keys(defaultTextProps), 'text').concat(commonStyleKeys)
export const imgStyleKeys = commonStyleKeys

import { commonProps, textProps } from '@/type/widgets/index'
import { without } from 'lodash-es'
// 物料的props默认值

export const defaultCommonProps: commonProps = {
    tag: 'div',
    url: '',
    height: '',
    width: '100%',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    opacity: 1
}

export const defaultTextProps: textProps = {
    text: '文字内容',
    fontSize: '16px',
    fontFamily: '',
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 1,
    textAlign: 'left',
    color: 'red'
}

// 样式的key数组
export const commonStyleKeys = without(Object.keys(defaultCommonProps), 'url')
export const textStyleKeys = without(Object.keys(defaultTextProps), 'text').concat(commonStyleKeys)

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
    paddingTop: '10px',
    paddingBottom: '10px',
    opacity: 1
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

// 样式的key数组
export const commonStyleKeys = without(Object.keys(defaultCommonProps), 'url')
export const textStyleKeys = without(Object.keys(defaultTextProps), 'text').concat(commonStyleKeys)


import TooltipButton from '@/components/TooltipButton.vue'
import IconSvg from '@/components/IconSvg/IconSvg.vue'
import FieldsColor from '@/components/propsTable/fields-color.vue'
import FieldsSelect from '@/components/propsTable/fields-select'

declare module 'vue' {
    interface GlobalComponents {
        TooltipButton: typeof TooltipButton;
        IconSvg: typeof IconSvg;
        'fields-color': typeof FieldsColor;
        'fields-select': typeof FieldsSelect;
    }
}

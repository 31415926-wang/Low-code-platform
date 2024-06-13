
import TooltipButton from '@/components/TooltipButton.vue'
import IconSvg from '@/components/IconSvg/IconSvg.vue'
import FieldsColor from '@/components/propsTable/fields-color.vue'
import FieldsSelect from '@/components/propsTable/fields-select'
import FilesUpload from '@/components/FilesUpload.vue'
import cropperModal from '@/components/CropperModal.vue'
import InlineEdit from '@/components/InlineEdit.vue'

declare module 'vue' {
    interface GlobalComponents {
        TooltipButton: typeof TooltipButton;
        IconSvg: typeof IconSvg;
        'fields-color': typeof FieldsColor;
        'fields-select': typeof FieldsSelect;
        FilesUpload: typeof FilesUpload;
        FropperModal: typeof cropperModal;
        InlineEdit: typeof InlineEdit;
    }
}

import { ref, reactive, watch } from 'vue'

// 获取验证码时，倒计时功能
export default function useGenVeriCode() {
    const timeNumber = ref(60000)
    const timeSwitch = ref(false)

    watch(timeSwitch, (val) => {
        if (val) {
            setInterval(() => {
                if (timeNumber.value === 0) {
                    timeSwitch.value = false
                    timeNumber.value = 60000
                }
                timeNumber.value = timeNumber.value - 1000
            }, 1000)
        }
    })
    return {
        timeNumber,
        timeSwitch
    }
}


/* 封装方法，监测DOM尺寸是否发生变化 */
import { onMounted, onUnmounted } from 'vue'

// export default function useObserveDomSize(goalSeletor: string, callBlack: () => void) {
//     let goalDom: HTMLElement
//     const resizeObserver = new ResizeObserver((entrise) => {
//         for (const entry of entrise) {
//             const { width, height } = entry.contentRect
//             // console.log('检测到变化', width, height)
//             callBlack()
//         }
//     })
//     onMounted(() => {
//         const goalDom = document.querySelector(goalSeletor)
//         goalDom && resizeObserver.observe(goalDom)
//     })
//     onUnmounted(() => {
//         goalDom && resizeObserver.unobserve(goalDom)
//     })
// }

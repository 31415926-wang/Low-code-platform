
export default function debounceFn(fn: (...x: any) => void, duration: number) {
    let timer: number | null = null

    return function (...arg: any) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            // @ts-ignore
            fn.apply(this, arg)
        }, duration)
    }
}

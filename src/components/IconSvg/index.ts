const req = require.context('@/assets/icons', true, /\.svg$/)
// 加载一个文件夹中所有svg文件
const requireAll = (requireContext: any) => {
    // console.log('断点1', requireContext.keys().map(requireContext))
    requireContext.keys().map(requireContext)
}
requireAll(req)

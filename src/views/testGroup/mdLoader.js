const loaderUtils = require('loader-utils')
const { marked } = require('marked')

const mdLoader = function (source) {
    const html = marked.parse(source, {})
    const options = loaderUtils.getOptions(this)
    console.log('mdLoader1', html)
    console.log('mdLoader2', options)
    const code = `export default ${JSON.stringify(html)}`
    return code
}

// 报错
// export default mdLoader
module.exports = mdLoader

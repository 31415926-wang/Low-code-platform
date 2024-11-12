
// 临时将静态资源服务器转到本地，
function handleUrl(url) {
    url.replace('https://static.imooc-lego.com/imooc-test', process.env.VUE_APP_BASE_URL)
    return url
}

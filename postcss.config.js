
/*
   记录： "postcss-px-to-viewport": "github:evrone/postcss-px-to-viewport"
   使用未稳定的版本，不然include会失效
*/
module.exports = {
    plugins: [{
        'postcss-px-to-viewport': {
            viewportWidth: 470, // 视口宽度（根据设计稿的宽度设置）
            mediaQuery: true, // 是否允许在媒体查询中转换 px
            include: [/previewWork/]
        }
    }
        // {
        //     'postcss-px-to-viewport': {
        //         viewportWidth: 1920, // 视口宽度（根据设计稿的宽度设置）
        //         // mediaQuery: true, // 是否允许在媒体查询中转换 px
        //         exclude: [/previewWork/],
        //         selectorBlackList: ['.middle-box']
        //     }
        // }
    ]
}

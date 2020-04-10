module.exports = {
  devServer: {
    open: true,   //自动打开浏览器
    port: 8888,    //随便改端口号
    proxy: {
      "/info": {     //请求 / ajax 开头   就会走 target 的值
        target: "http://114.215.149.176:3000",
        changeOrigin: true,  //是否改变了域名
        pathRewrite: {    //解决动态服务器地址一样
          "^/info": ""    //这个是把 开头是/api 的替换成后边的值
        }
      }
    },
    overlay: {    //遮罩层
      warnings: false,
      errors: false
    }
  },
  configureWebpack: {    //别名配置
    resolve: {
      alias: {
        "assets": "@/assets",      //等价于下面
        "con": "@/components"     // 设置后 con /  就等于 components 文件路径
      }
    }
  },
  lintOnSave: false  //是否关闭eslint 检查  false 是关闭
};
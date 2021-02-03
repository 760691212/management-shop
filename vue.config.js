'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title // 网址标题
const port = 8013 // 端口配置

module.exports = {
  publicPath: '/', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测， 有效值： ture | false | 'error'
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  devServer: {
    port: port, // 端口号
    hot: true, //自动保存
    open: true, // 在DevServer第一次构建完成时，自动用浏览器打开网页
    overlay: { // 这个配置属性用来在编译出错的时候，在浏览器页面上显示错误
      warnings: false,
      errors: true
    },
    // proxy: {
    //   '/api': {
    //     target: process.env.VUE_APP_BASE_API,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': 'api'
    //     }
    //   },
    //   '/auth': {
    //     target: process.env.VUE_APP_BASE_API,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/auth': 'auth'
    //     }
    //   }
    // }
  },
  configureWebpack: {
     // 在webpack的name字段中提供应用的标题， 这样它就可以在index.html中访问， 以注入正确的标题。
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 删除懒加载模块的prefetch，降低带宽压力 而且预渲染时生成的prefetch标签是modern版本的，低版本浏览器是不需要的 
    // 当页面太多时， 会导致太多无意义的请求
    config.plugins.delete('prefetch')
    // 可以提高第一屏的速度，建议开启预加载
    config.plugin('preload').tap(() => [{
      rel: 'preload',
      fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
      include: 'initial'
    }])
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'svgicon-[name]'
      })
      .end()
      
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
      config
        .when(process.env.NODE_ENV !== 'development',
        config => {
        config.plugin('ScriptExtHtmlWebpackPlugin')
              .after('html')
              .use('script-ext-html-webpack-plugin', [{
                // `runtime` must same as runtimeChunk name. default is `runtime`
                inline: /runtime\..*\.js$/
              }])
              .end()
              config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                  libs: {
                    name: 'chunk-libs',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: 'initial' // only package third parties that are initially dependent
                  },
                  elementUI: {
                    name: 'chunk-elementUI', // split elementUI into a single package
                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                  },
                  commons: {
                    name: 'chunk-commons',
                    test: resolve('src/components'), // can customize your rules
                    minChunks: 3, //  minimum common number
                    priority: 5,
                    reuseExistingChunk: true
                  }
                }
              })
            config.optimization.runtimeChunk('single')
      })
  },
  transpileDependencies: [
     'vue-echarts',
     'resize-detector'
  ], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
}
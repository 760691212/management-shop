import merge from 'webpack-merge'
import devConfig from './config.dev'
import prodConfig from './config.prod'

let config = {}

if (process.env.NODE_ENV === 'production'){
   config = prodConfig // 生产环境
}else{
  config = devConfig // 开发环境
}

export default merge(config)
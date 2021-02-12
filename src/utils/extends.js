export default {
  install(Vue ,args){
    Vue.prototype.$opNotice = {
      show: function (options) {
        Vue.prototype.$notify(Object.assign({}, options, {
          dangerouslyUseHTMLString: true,
          duration: 3000,
          offset: 60,
        }));
      },
      success: function (message, title = "操作成功") {
        this.show({
          message,
          title,
          type: "success"
        })
      },
      error: function (message, title = "发生错误") {
        this.show({
          message,
          title,
          type: "error"
        })
      },
      warning: function (message, title = "警告") {
        this.show({
          message,
          title,
          type: "warning"
        })
      },
      info: function (message, title = "系统提示") {
        this.show({
          message,
          title,
          type: "info"
        })
      }
    }
  }
}
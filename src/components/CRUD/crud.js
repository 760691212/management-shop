import Vue from 'vue'

function CRUD(options){
    const defaultOption = {
        // 标题
        title: '',
        // 请求数据
        url: '',
        // 表格数据
        data: [],
        // 选择项
        selections: [],
        // 待查询对象
        query: {},
        // 请求数据的方法
        method: 'get',
        // 请求数据的参数
        params: {},
        // 排序
        sort: [],
        // 是否启用分页
        enablePagInation: true,
        // 分格格式
        pageLayout: "total, sizes, prev, pager, next, jumper",
        // 分页默认参数
        pageDate: {
            page: 0, // 页码
            size: 20, // 每页数据条数
            total: 0 // 总条数
        },
        // 表单
        form: {},
        // 重置表单
        defaultForm: () => { },
        // 等待实践
        time: 50,
        crudMethod: {
            add: (form) => {},
            del: (id) => {},
            edit: (form) => {},
            get: (id) => {},
        },
        // 操作按钮显示
        featuresShow: {
            add: true,
            edit: true,
            del: true,
            download: true,
            import: false,
            reset: true,
        },
        // 调试开关
        debug: false,
        // 可编辑
        editable: true,
    }
    // 合并默认配置 和 传入配置
    options = mergeOptions(defaultOption , options)

    // 预定义数据
    const data = {
        ...options,
        // 数据状态
        dataStatus: {},
        status: {
            add: CRUD.STATUS.NORMAL, 
            edit: CRUD.STATUS.NORMAL,

            // 编辑 \ 添加 状态 
            get createOrUpdateStatus(){
                // 如果编辑和添加都正常 则返回正常
                if(this.add === CRUD.STATUS.NORMAL && this.edit === CRUD.STATUS.NORMAL){
                    return CRUD.STATUS.NORMAL
                }else if(this.add === CRUD.STATUS.PREPARED || this.edit === CRUD.STATUS.PREPARED){
                    return CRUD.STATUS.PREPARED
                }else if(this.add === CRUD.STATUS.PROCESSING || this.edit === CRUD.STATUS.PROCESSING){
                    return CRUD.STATUS.PROCESSING
                }
                throw new Error('编辑或添加状态有误！')
            },
            // 标题
            get title(){
                return crud.editable ? this.add > CRUD.STATUS.NORMAL ? `新增${crud.title}` : this.edit > CRUD.STATUS.NORMAL ? `编辑${crud.title}` : crud.title : `查看${crud.title}`
            }
        },
        // 功能完成时返回信息
        msg: {
            subnit: '提交成功',
            add: '新增【{title}】成功',
            edit: '编辑【{title}】成功',
            del: '删除【{title}】成功',
        },
        // 整体加载状态
        loading: false,
        // 导出状态
        downLoading: false,
        // 删除状态
        delLoading: false,
    }
    
    const methods ={
        notify(message, type = CRUD.NOTIFICATION_TYPE.INFO) {
            crud.vms[0].vm.$toast[type](message.replace("{title}", crud.title))
        },
    }

    // 创建 crud 数据对象
    const crud = Object.assign({}, data)
    //存储数据 应对一些简单的跨组件数据状态共享 Vue.observable vue > 2.6
    Vue.observable(crud)
    // 在crud中加入方法
    Object.assign(crud, methods)
    // 在crud中加入查询参数 记录初始默认的查询参数，后续重置查询时使用
    Object.assign(crud, {
        // 保存默认 查询参数
        defaultQuery: JSON.parse(JSON.stringify(data.query)),
        // 预留 4 个存储数据位 ： 主页数据、头部数据、分页数据、表单数据
        vms: Array(4),
        // 注册 vm 不懂
        registerVM(type, vm, index = -1){
            const vmObj = { type, vm: vm}
            if(index < 0){
                this.vms.push(vmObj)
                return
            }
            if (index < 4){
                this.vms[index] = vmObj
                return
            }
            this.vms.length = Math.max(this.vms.length, index);
            this.vms.splice(index, 1, vmObj)
        },
        // 取消注册组件实例
        unregisterVM(type, vm) {
            for (let i = this.vms.length - 1; i >= 0; i--) {
              if (this.vms[i] === undefined) {
                continue
              }
              if (this.vms[i].type === type && this.vms[i].vm === vm) {
                if (i < 4) { // 内置预留vm数
                  this.vms[i] = undefined
                } else {
                  this.vms.splice(i, 1)
                }
                break
              }
            }
          }
        })
    // 冻结处理，需要扩展数据的话，使用crud.updateProp(name, value)，以crud.props.name形式访问，这个是响应式的，可以做数据绑定
    Object.freeze(crud)

}

// 合并默认配置
function mergeOptions(defaultOption, options) {
    const newOption = {...defaultOption}
    // 去除默认配置中的空值
    for(const key in src){
        // 如果传入配置中含有默认配置的属性
        if(options.hasOwnProperty(key)){
            // 如果传入配置中有 功能显示配置--crud
            if(key === 'featuresShow'){
                // 覆盖原有配置中相同属性的值
                Object.assign(newOption[key], options[key])
            }else{
                // 直接覆盖原有配置属性
                newOption[key] = options[key]
            }

        }
    }
    return newOption
}

/**
 * CRUD状态
 */
CRUD.STATUS = {
    NORMAL: 0, // 正常
    PREPARED: 1, // 准备
    PROCESSING: 2 // 加工
}
/**
 * CRUD通知类型
 */
CRUD.NOTIFICATION_TYPE = {
    SUCCESS: 'success',
    WARNING: 'warning',
    INFO: 'info',
    ERROR: 'error'
  }
export default CRUD
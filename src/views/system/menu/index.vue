<template>
   <div class="flex app-container">
      <crudOperation :permission="permission" />
      <el-table 
        :data="crud.data" 
        @selection-change="crud.selectionChangeHandler"
        ref="table"
        v-loading="crud.loading"
        row-key="id" 
        max-height="700px" 
        empty-text="暂无菜单管理数据" 
        size="mini" 
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="title" label="菜单标题" />
          <el-table-column prop="icon" label="图标" />
          <el-table-column prop="type" label="类型"  />
          <el-table-column prop="sort" label="排序"  />
          <el-table-column prop="permission" label="权限标识"  />
          <el-table-column prop="name" label="组件名称"  />
          <el-table-column prop="component" label="组件路径"  />
          <el-table-column fixed="right" label="操作" width="150" align='center'>
            <template slot-scope="scope">
              <udOperation
                :data="scope.row"
                :permission="permission"
              />
            </template>
          </el-table-column>
      </el-table>
      
      <pagination />

      <el-dialog
        :before-close="crud.cancelCU"
        :close-on-click-modal="false"
        :title="crud.status.title"
        :visible.sync="crud.status.cu > 0"
        width="650px"
        class="no-selected"
        >
          <el-form :model="form" :inline="true" :rules="rules" ref="form" label-width="100px" label-suffix="：" size="mini">
            <div class="h sb wrap">
              <el-form-item label="菜单类型" prop="type">
                <el-radio-group v-model="form.type"  @change="handleMenuType(form.type)">
                  <el-radio-button label="0">目录</el-radio-button>
                  <el-radio-button label="1">菜单</el-radio-button>
                  <el-radio-button label="2">按钮</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="菜单图标" v-show="form.type !== '2'" prop="icon">
                  <el-input v-model.trim="form.icon" style="width: 220px;" placeholder="element icon">
                    <template slot="append">
                        <i v-if="form.icon" slot="prefix" :class="form.icon" style="height: 22px"/>
                        <el-tooltip v-else effect="dark" content="不用 element-ui 图标，我要创建矢量图标" placement="top-start">
                          <span class="uploading" @click="handleShowSvgForm">创建svg图标</span>
                        </el-tooltip>
                    </template>
                  </el-input>
              </el-form-item>
              <el-form-item v-show="form.type.toString() !== '2'" label="外链菜单" prop="isFrame">
                <el-radio-group v-model="form.isFrame" size="mini">
                  <el-radio-button label="1">是</el-radio-button>
                  <el-radio-button label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="form.type.toString() === '1'" label="菜单缓存" prop="isCache">
                <el-radio-group v-model="form.isCache" size="mini">
                  <el-radio-button label="1">是</el-radio-button>
                  <el-radio-button label="0">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="form.type.toString() === '1'" label="菜单可见" prop="isHidden">
                <el-radio-group v-model="form.isHidden" size="mini">
                  <el-radio-button label="0">是</el-radio-button>
                  <el-radio-button label="1">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="form.type.toString() !== '2' && form.isFrame > 0" label="外链地址" prop="framePath">
                <el-input v-model="form.framePath" style="width: 220px;" />
              </el-form-item>
              <el-form-item :label="form.type.toString() === '0' ? '目录标题' : form.type.toString() ? '菜单标题' : '按钮名称'" prop="title">
                <el-input v-model.trim="form.title" :style=" form.type.toString() === '0' ? form.isFrame > 0 ? 'width: 165px' : 'width: 220px' : form.type.toString() === '1'? form.isFrame > 0 ? 'width: 165px' : 'width: 165px' : 'width: 220px'" placeholder="菜单标题" />
              </el-form-item>
              <el-form-item v-if="form.type.toString() !== '2'" label="组件名称" prop="name">
                <el-input v-model="form.name" placeholder="组件名称" :style="form.type.toString() === '0' ? form.isFrame > 0 ?  'width: 220px;' :  'width: 165px;':'width: 220px'" />
              </el-form-item>
              <el-form-item v-show="form.type.toString() !== '0'" label="权限标识" prop="permission">
                <el-input v-model.trim="form.permission" :disabled="form.isFrame > 0" placeholder="权限标识" style="width: 165px;" />
              </el-form-item>
              <el-form-item label="菜单排序" prop="sort">
                  <el-input-number v-model.number="form.sort" :min="0" :max="999"  :style="form.isFrame > 0 ? 'width: 165px;' : 'width: 220px;'" />
              </el-form-item>
              <el-form-item v-if="form.type.toString() !== '2'" label="路由地址" prop="path">
                <el-input v-model.trim="form.path" placeholder="路由地址" :style="form.type.toString() === '0' ? form.isFrame > 0 ? 'width: 220px': 'width: 165px;': 'width: 220px'" />
              </el-form-item>
              <el-form-item label="上级目录" prop="pid">
                   <el-cascader
                    v-model="form.pid"
                    :options="options"
                    :props="{ checkStrictly: true }"
                    clearable 
                    :style=" form.type.toString() !== '2' ? form.type.toString() === '0' ?  form.isFrame > 0 ? 'width: 495px;' : 'width: 220px;' : form.isFrame > 0 ? 'width:495px ;' : 'width: 165px' : 'width: 495px;'" placeholder="选择上级类目" 
                    />
              </el-form-item>
            </div>
             <el-dialog
                width="30%"
                title="Svg"
                :visible.sync="isShowSvgForm"
                :close-on-click-modal="false"
                append-to-body
                style="margin-top: 1vh"
              >
              <div class="svgForm">
                <el-form :rules="rules" ref="svgForm"  label-width="100px" label-suffix="：" size="mini">
                  <el-form-item label="Svg 标题" prop="type">
                      <el-input v-model="form.framePath" style="width: 220px;" placeholder="请输入 Svg 标题"/>
                  </el-form-item>
                  <el-form-item label="Svg 代码" prop="type">
                     <el-input
                        type="textarea"
                        :rows="5"
                        placeholder="输入 Svg 代码"
                        v-model="textarea">
                    </el-input>
                  </el-form-item>
                </el-form>
              </div>
                <span slot="footer" class="dialog-footer">
                  <el-button size="mini" @click="handleSvgCancel">取 消</el-button>
                  <el-button size="mini" type="primary" @click="handleUploadSvg">确 定</el-button>
                </span>
            </el-dialog>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="crud.cancelCU">取 消</el-button>
          <el-button size="mini" :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import crudMenu from '@/api/system/menu'
import CRUD,  { presenter, header, form } from '@crud/crud'
import crudOperation from "@crud/CRUD.operation";
import Pagination from "@crud/Pagination";
import udOperation from "@crud/UD.operation";

const defaultForm = {
  menu_id: null,  //菜单id
  title: null,  //菜单标题
  icon: null,
  type: 0,  //类型(菜单、目录、按钮)
  path: null,  //路由地址
  pid: null,  //上级菜单ID
  sort: null,  //菜单排序
  permission: null,  //权限标识
  component: null,  //组件
  framePath: null,  //外链地址
  name: null,  //组件名称
  isFrame: 0,  //是否为外链菜单
  isCache: 0,  //是否缓存
  isHidden: 0,  //是否隐藏
}

export default {
  name: 'Menu',
  components: {
    crudOperation, Pagination, udOperation
  },
  cruds () {
    return CRUD({
      title: '菜单管理',
      idFileld: 'menu_id',
      size: 20,
      url: "api/system/menu",
      crudMethid: { ...crudMenu },
      optShow: {
        add: true,
        edit: true,
        del: true,
        download: true,
      },
      debug: true
    })
  },
  mixins: [presenter(), header(), form(defaultForm)],
  data() {
    return {
        permission: {
        add: ["a05:add"],
        edit: ["a05:edit"],
        del: ["a05:del"],
      },
      types: ['菜单', '目录', '按钮'],
      rules: {},
      isShowSvgForm: false,
       options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
    }
  },
  methods: {
    // 重新选择类型时 初始化 form表单
    handleMenuType(val){
      Object.assign(this.crud.form, defaultForm);
      this.crud.form.type = val
    },
    handleUploadSvg(){
      this.isShowSvgForm = false
    },
    handleSvgCancel(){
       this.isShowSvgForm = false
    },
    handleShowSvgForm(){
      this.isShowSvgForm = true
    }
  },
}
</script>
<style lang="scss" scoped>
.app-container{
  padding: 0 7px;
  .uploading{
    cursor: pointer;
  }
}
</style>
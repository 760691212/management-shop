<template>
   <div class="flex app-container">
      <crudOperation :permission="permission" />
      <el-table 
        :data="crud.data" 
        @selection-change="crud.selectionChangeHandler"
        ref="table"
        v-loading="crud.loading"
        row-key="menuId" 
        max-height="700px" 
        empty-text="暂无菜单管理数据" 
        size="mini" 
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="title" label="菜单标题" />
          <el-table-column prop="icon" label="图标" >
             <template slot-scope="scope">
                <i slot="prefix" :class="scope.row.icon" style="height: 22px;line-height: 22px; margin-left: 10px"/>
                <svg-icon :icon-class="scope.row.icon" style="margin-left: 10px"></svg-icon>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型"  />
          <el-table-column prop="sort" label="排序"  />
          <el-table-column prop="permission" label="权限标识"  />
          <el-table-column prop="name" label="组件名称"  />
          <el-table-column prop="path" label="组件路径"  />
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
        width="650px">
          <el-form :model="form" :inline="true" :rules="fromRules" ref="form" label-width="100px" label-suffix="：" size="mini">
            <div class="h sb wrap">
              <el-form-item label="菜单类型" prop="type">
                <el-radio-group v-model="form.type"  @change="handleMenuType(form.type)">
                  <el-radio-button label="0">目录</el-radio-button>
                  <el-radio-button label="1">菜单</el-radio-button>
                  <el-radio-button label="2">按钮</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="菜单图标" v-show="form.type.toString() !== '2'" prop="icon">
                  <el-input v-model.trim="form.icon" style="width: 220px;" placeholder="element icon" @blur="handleIconData(form.icon)">
                    <template slot="append">
                        <i v-if="isShowIcon === 0" slot="prefix" :class="form.icon" style="height: 22px;line-height: 22px"/>
                        <svg-icon v-if="isShowIcon === 1" :icon-class="form.icon"></svg-icon>
                        <el-tooltip v-if="isShowIcon === -1" effect="dark" content="不用 element-ui 图标，我要创建矢量图标" placement="top-start">
                          <span v-if="isShowIcon === -1" class="uploading" @click="handleShowSvgForm">{{form.icon ?'未找到，请创建svg' : '创建svg图标'}}</span>
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
              <el-form-item v-if="form.type.toString() !== '2'" label="路由路径" prop="path">
                <el-input v-model.trim="form.path" placeholder="路由路径" :style="form.type.toString() === '0' ? form.isFrame > 0 ? 'width: 220px': 'width: 165px;': 'width: 220px'" />
              </el-form-item>
              <el-form-item label="上级目录" prop="pid">
                  <el-cascader
                  v-model="form.pid"
                  :options="crud.data"
                  :props="cascaderProps"
                  :show-all-levels="false"
                  clearable 
                  :style=" form.type.toString() !== '2' ? form.type.toString() === '0' ?  form.isFrame > 0 ? 'width: 495px;' : 'width: 220px;' : form.isFrame > 0 ? 'width:495px ;' : 'width: 165px' : 'width: 495px;'" 
                  placeholder="选择上级类目" 
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
                <el-form :rules="svgFormRules" :model="svgForm" ref="svgForm"  label-width="100px" label-suffix="：" size="mini">
                  <el-form-item label="Svg 标题" prop="name">
                      <el-input v-model.trim="svgForm.name" style="width: 220px;" placeholder="请输入 Svg 标题"/>
                  </el-form-item>
                  <el-form-item label="Svg 代码" prop="svg">
                     <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="输入 Svg 代码"
                        v-model.trim="svgForm.svg">
                    </el-input>
                  </el-form-item>
                    <el-form-item label="svg 查找链接" label-width="150px" prop="type">
                      <a href="https://www.iconfont.cn/" target="_blank">iconfont.cn</a>
                    </el-form-item>
                </el-form>
              </div>
                <span slot="footer" class="dialog-footer">
                  <el-button size="mini" @click="handleSvgCancel">取 消</el-button>
                  <el-button size="mini" type="primary" @click="handleSaveSvg">确 定</el-button>
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
import crudMenu, { saveSvgIcon } from '@/api/system/menu'
import CRUD,  { presenter, header, form } from '@crud/crud'
import crudOperation from "@crud/CRUD.operation";
import Pagination from "@crud/Pagination";
import udOperation from "@crud/UD.operation";
import SvgIcon from "@/components/SvgIcon"

const defaultForm = {
  menuId: null,  //菜单id
  title: null,  //菜单标题
  icon: null,
  type: 0,  //类型(菜单、目录、按钮)
  nodeType: null, // 节点类型
  path: null,  //路由路径s
  pid: null,  //上级菜单ID
  sort: null,  //菜单排序
  permission: null,  //权限标识
  // component: null,  //组件
  framePath: null,  //外链地址
  name: null,  //组件名称
  isFrame: 0,  //是否为外链菜单
  isCache: 0,  //是否缓存
  isHidden: 0,  //是否隐藏
  isDelete: 0, // 是否删除
}

export default {
  name: 'Menu',
  components: {
    crudOperation, Pagination, udOperation, SvgIcon
  },
  cruds () {
    return CRUD({
      title: '菜单管理',
      idField: 'menuId',
      size: 20,
      url: "api/system/menus/query",
      hideOnSinglePage: true,
      crudMethod: { ...crudMenu },
      optShow: {
        add: true,
        edit: true,
        del: true,
        download: false,
      }
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
      cascaderProps: { 
        checkStrictly: true ,
        value: 'menuId',
        label: 'title',
        children: 'children',
        emitPath: false
      },
      types: ['菜单', '目录', '按钮'],
      fromRules: {
        title: [{required: true, message: "请输入标题", trigger: "blur"}],
        path: [{required: true, message: "请输入地址", trigger: "blur"}]
      },
      isShowIcon: -1,
      isShowSvgForm: false,
      menuList: [],
      svgForm:{
        name: '',
        svg: ''
      },
      svgFormRules:{
        name: [{ required: true, message: "请输入标题", trigger: "blur" },
                { pattern: /^[A-Za-z]+$/,message: '只能为英文格式', trigger: 'blur' }],
        svg: [{required: true, message: "请输入svg 内容", trigger: "blur" }]
      }
    }
  },
  methods: {
    handleIconData(icon){
       let mateIcon = null
      if(icon){
        if(icon.includes("el-icon")){
          this.isShowIcon = 0
        }else{
          const modulesFiles = require.context('@/assets/icons/svg', true, /\.svg$/)
          modulesFiles.keys().reduce((modules, modulePath) => {
            const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
            let name = moduleName;
            if(name === icon){
              mateIcon = name
            }
          }, {})
          if(mateIcon){
             this.isShowIcon = 1
          }else{
             this.isShowIcon = -1
          }
        }
      }else{
        this.isShowIcon = -1
      }
    },
    // 重新选择类型时 初始化 form表单
    handleMenuType(val){
      Object.assign(this.crud.form, defaultForm);
      this.crud.form.type = val
    },
     [CRUD.HOOK.afterLoad](crud, data) {
      return this.handleMenuData(data);
      
    },
    handleMenuData(data){
      let root = [];
      let parent = [];
      let sub = [];
      data && data.forEach(d => {
        if(d.type === 0){
          root.push(d)
          d.children = []
        }else if(d.type === 1){
          parent.push(d)
          d.children = []
        }else{
          sub.push(d)
        }
      })
      parent && parent.forEach(p =>{
        sub && sub.forEach(s => {
          if(s.pid === p.menuId){
            p.children.push(s)
          }
        })
        if(!p.children.length){
          delete p.children
        }
      })
      root && root.forEach(r=>{
        parent && parent.forEach(p => {
          if(r.menuId === p.pid){
            r.children.push(p)
          }
        })
        if(!r.children.length){
          delete r.children
        }
      })
      return root;
    },
    handleSaveSvg(){
      saveSvgIcon(this.svgForm).then(()=>{
        this.isShowSvgForm = false
        this.crud.form.icon = this.svgForm.name
        this.$refs.svgForm.resetField();
      })
    },
    handleSvgCancel(){
      this.$refs.svgForm.resetField();
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
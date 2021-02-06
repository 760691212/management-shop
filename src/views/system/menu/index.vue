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
          <el-table-column prop="name" label="类型"  />
          <el-table-column prop="address" label="排序"  />
          <el-table-column prop="address" label="权限标识"  />
          <el-table-column prop="address" label="组件路径"  />
          <el-table-column prop="address" label="排序"  />
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
        width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="crud.cancelCU">取 消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确 定</el-button>
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
  type: null,  //类型(菜单、目录、按钮)
  nodeType: null,  //节点类型 （根节点、父节点、子节点）
  path: null,  //路由地址
  pid: null,  //上级菜单ID
  subCount: null,  //子菜单个数
  sort: null,  //菜单排序
  permission: null,  //权限标识
  component: null,  //组件
  framePath: null,  //外链地址
  name: null,  //组件名称
  isFrame: null,  //是否为外链菜单
  isCache: null,  //是否缓存
  isHidden: null,  //是否隐藏
  isAlwaysShow: null,  //是否固定显示
  isDelete: null,  //是否删除
  createTime: null,  //创建日期
  updateTime: null,  //修改日期
  createBy: null,  //创建者
  updateBy: null,  //更新者
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
    }
  },
  methods: {
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    handleAdd(){
      
    },
    handleUpdate(date){

    },
    handleDel(date){
      
    },
  },
}
</script>
<style lang="scss" scoped>
.app-container{
  padding: 0 7px;
}
</style>
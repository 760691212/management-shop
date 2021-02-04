<template>
   <div class="flex app-container">
      <div class="CRUD_operation no-flex">
        <el-button icon="el-icon-plus" class="button add-btn" @click="handleAdd" round>新增</el-button>
        <el-button icon="el-icon-edit" class="button update-btn"  @click="handleUpdate" round>修改</el-button>
        <el-button icon="el-icon-delete" class="button del-btn"  @click="handleDel" round>删除</el-button>
      </div>
      <el-table :data="tableData" row-key="id" max-height="700px" empty-text="暂无信息" size="mini" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="date" label="菜单标题" />
          <el-table-column prop="date" label="图标" />
          <el-table-column prop="name" label="类型"  />
          <el-table-column prop="address" label="排序"  />
          <el-table-column prop="address" label="权限标识"  />
          <el-table-column prop="address" label="组件路径"  />
          <el-table-column prop="address" label="排序"  />
          <el-table-column fixed="right" label="操作" width="150" align='center'>
              <template slot-scope="scope">
                <el-button @click="handleAdd(scope.row)" class="search-btn-circle" icon="el-icon-view" circle size="mini" />
                <el-button @click="handleUpdate(scope.row)" class="update-btn-circle" icon="el-icon-edit" circle size="mini" />
                <el-button @click="handleDel(scope.row)" size="mini" class="del-btn-circle" icon="el-icon-delete" circle/>
              </template>
          </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="CRUD_pagination no-select"
        :current-page="4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400" />
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import { getMenusAll } from '@/api/system/menu'
export default {
    name: 'Menu',
    data() {
      return {
        tableData: []
      }
    },
    created(){
      // getMenusAll().then(res => {
      //   console.log(res);
      // })
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
  .CRUD_operation{
    min-width: 500px;
    padding: 12px 0 10px 20px;
    .button{
      margin: 0 15px;
    }
  }
  .CRUD_pagination{
    padding: 15px 0 10px 12px;
  }
}
</style>
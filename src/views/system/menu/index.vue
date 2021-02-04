<template>
   <div class="flex app-container">
      <div class="CRUD_operation no-flex">
          <el-button icon="el-icon-plus" class="button add-btn"  round>新增</el-button>
          <el-button icon="el-icon-edit" class="button update-btn" round>修改</el-button>
          <el-button icon="el-icon-delete" class="button del-btn" round>删除</el-button>
      </div>
      <div class="app-menu v container-main">
          <el-table :data="tableData" row-key="id" max-height="700px" size="mini" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
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
                      <el-button @click="handleClick(scope.row)" class="search-btn-circle" icon="el-icon-view" circle size="mini" />
                      <el-button @click="handleClick(scope.row)" class="update-btn-circle" icon="el-icon-edit" circle size="mini" />
                      <el-button size="mini" class="del-btn-circle" icon="el-icon-delete" circle/>
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
      </div>
    </div>
</template>
<script>
import { getMenusAll } from '@/api/system/menu'
export default {
    name: 'Menu',
    data() {
      return {
        tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },{
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    created(){
      getMenusAll().then(res => {
        console.log(res);
      })
    },
    methods: {
      handleClick(){

      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    },
}
</script>
<style lang="scss" scoped>
.app-container{
  .CRUD_operation{
    width: 100%;
    padding: 12px 0  3px 20px;
    .button{
      margin: 0 15px;
    }
  }
  .CRUD_pagination{
    padding: 15px 0 10px 12px;
  }
  .app-menu{
    padding: 7px;
  }
}
</style>
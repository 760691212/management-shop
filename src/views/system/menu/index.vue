<template>
   <div class="flex app-container">
      <div class="container-main">
           <el-button icon="el-icon-plus" class="add-btn" size="small" round>新增</el-button>
           <el-button icon="el-icon-edit" class="update-btn" size="small" round>修改</el-button>
           <el-button icon="el-icon-delete" class="del-btn" size="small" round>删除</el-button>
           <el-button icon="el-icon-upload" class="uploading-btn" size="small" round>上传</el-button>
           <el-button icon="el-icon-download" class="download-btn" size="small" round>下载</el-button>
           <el-button icon="el-icon-search" class="search-btn" size="small" round>搜索</el-button>
      </div>
  </div>
</template>
<script>
export default {
    name: 'Menu',
}
</script>
<style lang="scss" scoped>
</style>
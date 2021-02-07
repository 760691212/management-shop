<template>
  <div class="crud-opts no-selected">
    <span class="crud-opts-left">
      <!--左侧插槽-->
      <slot name="left" />
      <el-button v-if="crud.optShow.add" class="filter-item add-btn" icon="el-icon-plus" @click="crud.toAdd()">新增</el-button>
      <el-button v-if="crud.optShow.del" slot="reference" class="filter-item del-btn" icon="el-icon-delete" :loading="crud.delAllLoading" :disabled="crud.selections.length === 0" @click="toDelete(crud.selections)">删除</el-button>
      <el-button v-if="crud.optShow.download" :loading="crud.downloadLoading" :disabled="!crud.data.length" class="filter-item download-btn" icon="el-icon-download" @click="crud.doExport">导出</el-button>
      <!--右侧-->
      <slot name="right" />
    </span>
    <div class="crud-opts-right">
      <slot name="other"></slot>
      <el-button-group>
        <el-tooltip content="显示/隐藏搜索栏" placement="top">
          <el-button plain :class="crud.props.searchToggle ? 'search-btn' : 'activeSearch'" icon="el-icon-search" @click="toggleSearch()" />
        </el-tooltip>
        <el-tooltip content="刷新数据" placement="top">
          <el-button plain class="refresh-btn" icon="el-icon-refresh" @click="crud.refresh()" />
        </el-tooltip>
      </el-button-group>
    </div>
  </div>
</template>
<script>
import { crud } from "@crud/crud";

export default {
  mixins: [crud()],
  props: {
    permission: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  created() {
    this.crud.updateProp("searchToggle", true);
  },
  methods: {
    toDelete(datas) {
      this.$confirm(`确认删除选中的${datas.length}条数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.crud.delAllLoading = true;
          this.crud.doDelete(datas);
        })
        .catch(() => {});
    },
    toggleSearch() {
      this.crud.props.searchToggle = !this.crud.props.searchToggle;
    },
  },
};
</script>

<style lang="scss">
.crud-opts {
  display: flex;
  align-items: flex-start;
  padding: 15px 5px 0 5px;
  .crud-opts-left {
    display: flex;
    align-items: flex-start;
  }
  .crud-opts-right {
    margin-left: auto;
    margin-bottom: 10px;
  }
  .filter-item {
    margin-left: 0;
    margin-right: 20px;
  }
  .activeSearch{
    padding: 8px 25px !important;
    transition: 500ms ease all;
    font-weight: bold !important;
    letter-spacing:2px;
    border: none;
    background-color: #e2e2e2ce;
    color:  #13cfa6;
    box-shadow: 0 0 5px #c0c0c0d3 inset;
  }
}
</style>

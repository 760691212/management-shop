<template>
  <div>
    <slot></slot>
    <el-tooltip v-if="editable" content="编辑" placement="top">
       <el-button :loading="crud.status.cu === 2" size="mini" class="update-btn-circle" circle icon="el-icon-edit" @click.stop="crud.toEdit(data, true)" />
    </el-tooltip>
    <el-tooltip v-if="editable" content="删除" placement="top">
      <el-button size="mini" class="del-btn-circle" circle icon="el-icon-edit" @click.stop="toDelete" />
    </el-tooltip>
  </div>
</template>
<script>
import { crud } from "@crud/crud";
export default {
  mixins: [crud()],
  props: {
    button: Boolean,
    data: {
      type: Object,
      required: true,
    },
    permission: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    msg: {
      type: String,
      default: "确定删除本条数据吗？",
    },
  },
  data() {
    return {
      pop: false,
    };
  },
  methods: {
    toDelete() {
      this.$confirm(this.msg, "操作确认", {
        type: "warning",
        dangerouslyUseHTMLString: true,
      }).then(() => {
        this.crud.doDelete(this.data);
      });
    },
  },
};
</script>

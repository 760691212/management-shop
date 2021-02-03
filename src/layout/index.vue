<template>
  <div :class="layoutStatus" class="h layout">
    <sidebar class="sidebar-container" />
    <div class="main-container v flex">
      <div class="v no-flex">
        <navbar />
        <tags-view v-if="needTagsView"/>
      </div>
        <app-main/>
    </div>
  </div>
</template>
<script>
import { Sidebar , Navbar, TagsView, AppMain } from './components'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components:{
    Sidebar, Navbar, TagsView, AppMain
  },
  computed: {
    ...mapState({
      sidebar : state => state.app.sidebar,
      device: state => state.app.device,
      needTagsView: state => state.settings.tagsView,
    }),
    layoutStatus(){
      return {
        foldSidebar: !this.sidebar.opened, // 折叠
        openSidebar: this.sidebar.opened, // 打开
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/mixin.scss";
@import "~@/assets/styles/variables.scss";
  .layout{
    width: 100%;
    height: 100%;
  }
</style>
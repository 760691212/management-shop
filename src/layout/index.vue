<template>
  <div class="app-layout" :class="layoutStatus">
     <sidebar class="sidebar-container" />
      <div class="h c layout">
        <sidebar class="sidebar-container" />
        <div class="main-container v flex">
          <div class="v">
            <navbar />
            <tags-view v-if="needTagsView"/>
          </div>
          <app-main class="flex"/>
       </div>
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
.app-layout{
   @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .layout{
      width: 100%;
      height: 100%;
    }
}
</style>
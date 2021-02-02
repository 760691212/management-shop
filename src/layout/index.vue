<template>
  <div class="app-layout" :class="layoutStatus">
     <sidebar class="sidebar-container" />
     <div class="main-container">
        <navbar/>
        <tags-view />
     </div>
  </div>
</template>
<script>
import { Sidebar , Navbar, TagsView } from './components'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components:{
    Sidebar, Navbar, TagsView
  },
  computed: {
    ...mapState({
      sidebar : state => state.app.sidebar,
    }),
    layoutStatus(){
      return {
        foldSidebar: !this.sidebar.opened, // 折叠
        // openSidebar: this.sidebar.opened, // 打开
        // withoutAnimation: this.sidebar.withoutAnimation,
        // mobile: this.device === 'mobile'
      }
    }
  },
  data() {
    return{
      
    }
  }
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
    
    .fixed-header {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9;
      width: calc(100% - #{$sideBarWidth});
      transition: width 0.28s;
    }

    .foldSidebar .fixed-header{
       width: calc(100% - 54px)
    }

}
</style>
<template>
  <div class="app-layout">
     <sidebar class="sidebar-container" />
  </div>
</template>
<script>
import { Sidebar } from './components'
export default {
  name: 'Layout',
  components:{
    Sidebar
  },
  data() {
    return{
      
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.app-layout{
   @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}
</style>
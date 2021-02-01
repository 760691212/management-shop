<template>
  <div class="app-layout">
     <sidebar class="sidebar-container" />
     <div class="main-container">
       <div></div>
     </div>
  </div>
</template>
<script>
import { Sidebar } from './components'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components:{
    Sidebar
  },
  computed: {
    ...mapState({
      sidebar : state => state.app.sidebar,
    })
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
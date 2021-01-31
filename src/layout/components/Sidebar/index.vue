<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        default-active="2"
        :background-color="variables.menuBg"
        :unique-opened="true"
        text-color="#fff"
        active-text-color="#ffd04b">
          <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import sidebarItem from './sidebarItem'
export default {
  name: 'Sidebar',
  components:{
    sidebarItem
  },
  computed: {
    ...mapGetters([
      'permission_routes',
  ]),
   variables() {
      return variables
  },
  },
  data(){
    return{
      
    }
  },
}
</script>
<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <logo v-if="true" :collapse="false" /> -->
      <el-menu
        :default-active="activeMenu"
        :active-text-color="variables.menuActiveText"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :collapse="isFolding"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        >
          <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from './logo'
import variables from '@/styles/variables.scss'
import sidebarItem from './sidebarItem'
export default {
  name: 'Sidebar',
  components:{
    sidebarItem,Logo
  },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    variables() {
        return variables
    },
    // 导航栏是否折叠
    isFolding() {
      return !this.sidebar.opened
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu){
        return meta.activeMenu
      }
      return path
    }
  },
}
</script>
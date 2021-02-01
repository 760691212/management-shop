<template>
    <div class="navbar">
        <hamburger 
            id="hamburger-container"
            :is-unfold="sidebar.opened" 
            class="hamburger-container" 
            @handleToggleClick="handleToggleClick" />
        <breadcrumb 
            id="breadcrumb-container" 
            class="breadcrumb-container" />
        <div class="right-menu">
            
        </div>


    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'

export default {
    name: 'Navbar',
    components: { Hamburger, Breadcrumb },
    computed: {
    ...mapGetters([
      'sidebar',
    ])
  },
    methods:{
        handleToggleClick(){
            this.$store.dispatch('app/toggleSidebar')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.navbar{
    height: 50px;
    overflow: hidden;
    position: relative;
    background: $navbarBg;
    box-shadow: $navbarBoxshadow;
    .hamburger-container{
        line-height: 50px;
        height: 100%;
        float: left;
        cursor: pointer;
        transform: background  .5;
        -webkit-tap-highlight-color: transparent;
        &:hover{
            background-color: rgba(0, 0, 0, .025);
        }
    }
    .breadcrumb-container{
        float: left;
    }
}
</style>
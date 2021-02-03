<template>
    <div class="navbar">
        <hamburger  id="hamburger-container" :is-unfold="sidebar.opened" :fill="variables.hamburgerColor" class="hamburger-container"    @handleToggleClick="handleToggleClick" />
        <breadcrumb  id="breadcrumb-container"  class="breadcrumb-container" />
        <div class="right-menu">
            <digital-clock class="clock"/>
            <screenfull id="screenfull" class="right-menu-item hover-effect" />
            <el-popover
                placement="top-start"
                width="450"
                trigger="hover"
               >
                <div class="shortcutmenu v no-select">
                    <div class="h c sb padding-0-20">
                        <div>常用菜单</div>
                        <div class="fc-p cursor">菜单管理</div>
                    </div>
                     <el-divider class="margin-10-0"/>
                     <div class="showMenus h c wrap">
                         <div class="menu-item">首页</div>
                         <div class="menu-item">首页</div>
                         <div class="menu-item">首页</div>
                         <div class="menu-item">首页</div>
                         <div class="menu-item">首页</div>
                         <div class="menu-item">首页</div>
                         <div class="menu-item">首页</div>
                         <div class="menu-item">首页</div>
                         <div class="menu-item">首页</div>
                     </div>
                </div>
                <shortcut-menu id="shortcutMenu" slot="reference" class="el-dropdown-link right-menu-item hover-effect"/>
            </el-popover>
            <el-popover
                placement="top-start"
                width="300"
                trigger="hover"
                 style="margin-top: -10px"
               >
                <div class="notificationBar v no-select">
                    <div class="h c">
                        <div>常用菜单</div>
                    </div>
                     <el-divider class="margin-10-0"/>
                     <div class="showMenus h c wrap">
                         <div class="menu-item">首页</div>
                     </div>
                </div>
                <template slot="reference">
                    <div class="notification">
                        <el-badge :value="120" :max="99" hidden class="badge">
                            <notification id="notification"  class="item el-dropdown-link right-menu-item hover-effect"/>
                        </el-badge>
                    </div>
                </template>
            </el-popover>
            <el-dropdown >
                <login-user class="el-dropdown-link right-menu-item"/>
                <el-dropdown-menu slot="dropdown" style="margin-top: -10px">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>注销登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'
import DigitalClock from '@/components/DigitalClock'
import ShortcutMenu from '@/components/ShortcutMenu'
import Notification from '@/components/Notification'
import LoginUser from '@/components/LoginUser'
import variables from '@/assets/styles/variables.scss'
export default {
    name: 'Navbar',
    components: { Hamburger, Breadcrumb, Screenfull, DigitalClock, ShortcutMenu, Notification, LoginUser},
    data(){
        return{
            showMenuCard:true,
        }
    },
    computed: {
    ...mapGetters([
      'sidebar',
    ]),
    variables(){
        return variables
    }
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
.shortcutmenu{
    font-size: 12px;
    font-weight: bold;
    .menu-item{
        cursor: pointer;
        padding: 8px 50px;
        margin: 2px 8.5px;
        cursor: pointer;
        transition: background 0.3s;
        border-radius: 5px;
        transition: background 0.3s;
        &:hover{
             background-color: #409eff;
             color: #fff;
        }
    }
}
.navbar{
    min-width: 700px;
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
        transform: background .5;
        -webkit-tap-highlight-color: transparent;
        &:hover{
            background-color: rgba(0, 0, 0, .025);
        }
    }
    .breadcrumb-container{
        float: left;
    }
    .right-menu{
        float: right;
        height: 100%;
        line-height: 50px;
        &:focus{ // 获取焦点样式
            outline: none; // 没有边框
        }
        .clock{
            display: inline-block;
            vertical-align: text-bottom;
            margin-right: 20px;
        }
        .right-menu-item{
            display: inline-block;
            padding: 0 12px;
            height: 100%;
            font-size: 18px;
            color: $screenfullColor;
            vertical-align: text-bottom; //设置元素的垂直对齐方式 把元素的底端与父元素字体的底端对齐
            &.hover-effect {
                cursor: pointer;
                transition: background .3s;
                -webkit-tap-highlight-color: transparent;
                 transition: background 0.3s;
                &:hover {
                background: rgba(0, 0, 0, .025)
                }
            }
        }
        .notification{
            display: inline-block;
            .item{
                margin-top: -12px;
                margin-right: -15px;
            }
            .badge{
                z-index: 999;
                margin-top: -6px;
            }
        }
    }
}
</style>
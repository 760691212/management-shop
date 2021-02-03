<template>
    <el-breadcrumb class="app-brandcrumb no-select" separator-class="el-icon-caret-right">
        <transition-group name="brandcrumb">
            <el-breadcrumb-item v-for="(item,index) in menuList" :key="item.path">
                <span v-if="item.redirect==='noRedirect'||index==menuList.length-1" class="no-redirect">{{ item.meta.title }}</span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>
<script>
import * as pathToRegexp from 'path-to-regexp'
export default {
    name: 'Breadcrumb',
    data() {
        return{
            menuList: null
        }
    },
    watch:{
        $route(route){
            if(route.path.startsWith('/redirect/')){
                return
            }
            this.getBreadcrumb()
        }
    },
    created(){
        this.getBreadcrumb()
    },
    methods:{
        getBreadcrumb(){
            let menu = this.$route.matched.filter(item => item.meta && item.meta.title)
            const first = menu[0]
            if(!this.isDashboard(first)){
                menu = [{ path: '/dashboard', meta: { title: '首页' }}].concat(menu)
            }
            this.menuList = menu.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
        },
        isDashboard(route){
            const name = route && route.name
            if (!name) {
                return false
            }
            return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
        },
        handleLink(item){
             const { redirect, path } = item
            if (redirect) {
                this.$router.push(redirect)
                return
            }
            this.$router.push(this.pathCompile(path))
        },
        pathCompile(path) {
            const { params } = this.$route
            var toPath = pathToRegexp.compile(path)
            return toPath(params)
        },
    }
}
</script>
<style lang="scss" scoped>
.app-brandcrumb.el-breadcrumb{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    .no-redirect {
        color: #97a8be;
        cursor: default;
    }
}
</style>
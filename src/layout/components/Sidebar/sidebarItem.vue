<template>
  <div v-if="!item.hidden">
    <template v-if="!item.alwaysShow && hasChildNode(item.children,item) && (!child.children || child.noChildren)">
      <app-link v-if="child.meta" :to="resolvePath(child.path)">
        <el-menu-item :index="resolvePath(child.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="child.meta.icon||(item.meta && item.meta.icon)" :title="child.meta.title" />
        </el-menu-item>
      </app-link>
    </template>    
    
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>
<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import AppLink from './link'
import Item from './item'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  mixins: [FixiOSBug],
  components:{ AppLink,Item },
  props:{
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
     basePath: {
      type: String,
      default: ''
    }
  },
  data(){
    return{
      child: null,
    }
  },
  methods:{
    /**
     * 判断是否有唯一子节点，没有返回本身，有，返回子节点，有多个子节点则返回 false
     */
    hasChildNode(children = [], parent){
      let showingChildren = []
      children.forEach(item => {
        if(!item.hidden){
          showingChildren.push(item)
        }
      })
      if(showingChildren.length === 1){
        this.child = showingChildren[0]
        return true
      }
      if(showingChildren.length === 0){
        this.child = { ... parent,path: '', noChildren: true }
        return true
      }
      return false
    },
    /**
     * 处理请求路径
     */
    resolvePath(routePath){
      if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      }
    }
  }
</script>
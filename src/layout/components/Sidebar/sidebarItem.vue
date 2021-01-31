<template>
  <div v-if="!item.hidden">
    <template v-if="!item.alwaysShow && hasChildNode(item.children,item) && (!child.children || child.noChildren)">
    </template>
    <el-menu-item>{{item}}</el-menu-item>
    
  </div>
</template>
<script>
import { isExternal } from '@/utils/validate'
export default {
  name: 'SidebarItem',
  props:{
    item: {
      type: Object,
      required: true
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
  computed:{
    isExternal(){
      return isExternal()
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
        this.child = kids[0]
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
}
</script>
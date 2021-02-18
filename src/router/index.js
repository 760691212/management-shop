import router from './router'
import store from '@/store'
import config from "@/settings"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { buildMenus } from '@/api/system/menu'
import { filterAsyncRouter } from '@/store/modules/permission'

NProgress.configure({ showSpinner: false }) // 进度环显示隐藏

const whiteList = ['/login']

// 路由获取之前
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + config.title
  }
  NProgress.start()
  // 获取 token  如果存在
  if(getToken()) {
    if(store.getters.roles.length === 0){ // 判断当前用户是否已拉去完 user_info 信息
      // store 获取 信息
      store.dispatch('GetInfo').then(res => {
        // 动态路由， 加载菜单
        loadMenus(next, to)
      }).catch((err) => {
        console.log(err);
        store.dispatch('LogOut').then(() => {
          // 刷新页面  为了重新实例化vue-router对象 避免bug
          location.reload()
        })
      })
      // 登录时未拉取菜单，在此处拉取
    } else if(store.getters.loadMenus){
      // 修改成 flase ，防止死循环
      store.dispatch('updateLoadMenus').then(res => {})
      // 加载菜单
      loadMenus(next, to)
    }else {
      next()
    }
  }else {
    if(whiteList.indexOf(to.path) !== -1){
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    const asyncRouter = filterAsyncRouter(res)
    asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
    store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
  })
}

router.afterEach(()=>{
  NProgress.done()
})
import Vue from "vue";
import Router from "vue-router";
import Layout from '@/layout'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router);
export const constantRoutes = [
  {
    path: '/login',
    meta: { title: '登录', noCache: true },
    component: (resolve) => require(['@/views/login'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: (resolve) => require(['@/views/special/redirect'], resolve)
    }],
  },
  {
    path: '/404',
    component: () => import('@/views/special/404'),
    hidden: true
  }, 
  {
    path: '/401',
    component: () => import('@/views/special/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: (resolve) => require(['@/views/dashboard/index'], resolve),
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true,
        noCache: false
      }
    }]
  },
  //   {
  //     path: '/system',
  //     component: Layout,
  //     meta: {
  //       title: '系统设置',
  //       icon: 'setting'
  //     },
  //     alwaysShow: true,
  //     children: [{
  //       path: 'menu',
  //       component: () => import('@/views/system/menu/index'),
  //       name: 'Menu',
  //       meta: {
  //         title: '菜单管理',
  //         icon: 'menu'
  //       }
  //     }],
  // }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;
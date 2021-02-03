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
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
    {
      path: '/system',
      component: Layout,
      meta: {
        title: '系统设置',
        icon: 'el-icon-s-tools'
      },
      alwaysShow: true,
      children: [{
        path: 'menu',
        component: () => import('@/views/system/menu/index'),
        name: 'Menu',
        meta: {
          title: '菜单',
          icon: 'menu'
        }
      }],
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
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

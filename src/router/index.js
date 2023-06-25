import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  }
  // {
  //   path: '/systems',
  //   component: Layout,
  //   redirect: '/systems/users',
  //   name: 'Systems',
  //   meta: {
  //     title: '系统管理', icon: 'tree'
  //   },
  //   children: [
  //     {
  //       path: 'users',
  //       component: () => import('@/views/systems/users/index'),
  //       name: 'Users',
  //       meta: { title: '用户管理', icon: 'user' }
  //     },
  //     {
  //       path: 'roles',
  //       component: () => import('@/views/systems/roles/index'),
  //       name: 'Roles',
  //       meta: { title: '权限管理', icon: 'role' }
  //     }
  //   ]
  // },
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/test1',
  //   name: 'Test',
  //   meta: { title: '测试列表', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'test1',
  //       name: 'Test1',
  //       component: () => import('@/views/test/test1/index'),
  //       meta: { title: '功能项1', icon: 'table' }
  //     },
  //     {
  //       path: 'test2',
  //       name: 'Test2',
  //       component: () => import('@/views/test/test2/index'),
  //       meta: { title: '功能项2', icon: 'table' }
  //     },
  //     {
  //       path: 'test3',
  //       name: 'Test3',
  //       component: () => import('@/views/test/test3/index'),
  //       meta: { title: '功能项3', icon: 'table' }
  //     }
  //   ]
  // },

  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

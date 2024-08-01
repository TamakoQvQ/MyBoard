import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/index.vue';

const routes = [
  {
    path: '/',
    component: () => import('@/views/login/Login.vue'),
    name: 'Login',
  },
  {
    path: '/inbox',
    component: Layout,
    redirect: '/inbox', //默认跳转到项目页面
    children: [
      {
        path: '/inbox',
        component: () => import('@/views/inbox/Inbox.vue'),
        name: 'Inbox',
        meta: {
          title: '项目'
        }
      },
      {
        path: '/personalCenter',
        component: () => import('@/views/personalCenter/PersonalCenter.vue'),
        name: 'PersonalCenter',
        meta: {
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '/projectDetails',
    component: () => import('@/views/projectDetails/ProjectDetails.vue'),
    name: 'ProjectDetails',
   
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;
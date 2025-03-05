import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '@/components/views/dashboard/Home.vue'
import Login from '@/components/views/auxilliary/Login.vue'
import Test1 from '@/components/Test1.vue'
import Test2 from '@/components/Test2.vue'
import Test3 from '@/components/Test3.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Home,
    },
    {
      path: '/test1',
      name: 'test1',
      component: Test1,
    },
    {
      path: '/test2',
      name: 'test2',
      component: Test2,
    },
    {
      path: '/test3',
      name: 'test3',
      component: Test3,
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: LoginView,
    // },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../components/Login.vue'),
    // },
  ],
})

export default router

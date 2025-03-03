import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../views/Home.vue'
import Login from '@/components/Login.vue'
// import Miller from '../components/Miller.vue'

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
    // {
    //   path: '/miller',
    //   name: 'miller',
    //   component: Miller,
    // },
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
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Login.vue'),
    },
  ],
})

export default router

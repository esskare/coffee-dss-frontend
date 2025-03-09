import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/views/dashboard/Home.vue'
import Login from '@/components/views/auth/Login.vue'
import ForgotPassword from '@/components/views/auth/ForgotPassword.vue'
import Dashboard1 from '@/components/views/dashboard/Dashboard1.vue'
import Dashboard2 from '@/components/views/dashboard/Dashboard2.vue'
import Dashboard3 from '@/components/views/dashboard/Dashboard3.vue'
import Settings from '@/components/Settings.vue'
import Stepper from '@/components/views/ui/Stepper.vue'
import Test from '@/components/views/pages/Test.vue'
import RegisterFarmer from '@/components/views/pages/RegisterFarmer.vue'
import Report from '@/components/views/pages/Report.vue'
import DataTable from '@/components/views/ui/DataTable.vue'
import DataTableDashboard from '@/components/views/dashboard/DataTableDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
    },
    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Home,
    },
    {
      path: '/test1',
      name: 'test1',
      meta: { requiresAuth: true },
      component: Dashboard1,
    },
    {
      path: '/test2',
      name: 'test2',
      component: Dashboard2,
    },
    {
      path: '/test3',
      name: 'test3',
      component: Dashboard3,
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: Test,
    // },
    {
      path: '/Settings',
      name: 'settings',
      component: Dashboard3,
    },
  ],
})

// Navigation guard to check auth status
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router

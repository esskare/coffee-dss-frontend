import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/views/dashboard/Home.vue'
import Login from '@/components/views/auth/Login.vue'
import ForgotPassword from '@/components/views/auth/ForgotPassword.vue'
import Dashboard1 from '@/components/views/dashboard/Dashboard1.vue'
import Dashboard2 from '@/components/views/dashboard/Dashboard2.vue'
import Dashboard3 from '@/components/views/dashboard/Dashboard3.vue'
import Settings from '@/components/views/pages/Settings.vue'
import Stepper from '@/components/views/ui/Stepper.vue'
import RegisterSociety from '@/components/views/pages/RegisterSociety.vue'
import CoffeeDelivery from '@/components/views/pages/CoffeeDelivery.vue'
import Report from '@/components/views/pages/Report.vue'
import DataTable from '@/components/views/ui/DataTable.vue'
import DataTableDashboard from '@/components/views/dashboard/DataTableDashboard.vue'
import Dashboard4 from '@/components/views/dashboard/Dashboard4.vue'
import DashboardW from '@/components/views/dashboard/DashboardW.vue'
import DashboardC from '@/components/views/dashboard/DashboardC.vue'
import Whomepage from '@/components/views/pages/Whomepage.vue'
import StoredCoffee from '@/components/views/pages/StoredCoffee.vue'
import DashboardR from '@/components/views/dashboard/DashboardR.vue'
import Societies from '@/components/views/pages/Societies.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
    },
    {
      path: '/warehouse',
      name: 'Whomepage',
      component: Whomepage,
    },
    {
      path: '/forgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/report',
      name: 'report',
      component: Report,
    },

    {
      path: '/store',
      name: 'StoredCoffee',
      component: StoredCoffee,
    },
    {
      path: '/store',
      name: 'StoredCoffee',
      component: StoredCoffee,
    },
    {
      path: '/store',
      name: 'StoredCoffee',
      component: StoredCoffee,
    },

    {
      path: '/societies',
      name: 'societies',
      component: Societies,
    },

    {

      path: '/dashboard',
      name: 'dashboard',
      component: Home,
    },
    {
      path: '/test1',
      name: 'test1',
     // meta: { requiresAuth: true },
      component: Dashboard1,
    },


    {
      path:'/societydetails',
      name: 'societydetails',
      component: DashboardW,
    },

    {
      path:'/coffeedelivery',
      name: 'coffeedelivery',
      component: DashboardC,
    },

    {
      path:'/receivedcoffee',
      name: 'receivedcoffee',
      component: DashboardR ,
    },

    {
      path: '/farmerdetails',
      name: 'farmerdetails',
      component: Dashboard3,
    },
    {
      path: '/test5',
      name: 'test5',
      component: Dashboard4,
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: Test,
    // },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
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

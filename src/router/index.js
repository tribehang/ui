import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Profile from '@/components/Profile'
import ProductDetail from '@/components/ProductDetail'
import SaleAppointment from '@/components/SaleAppointment'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/details',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/sale/:sale_id/appointment',
      name: 'SaleAppointment',
      component: SaleAppointment
    }
  ]
})

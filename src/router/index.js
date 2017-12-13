import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Profile from '@/components/Profile'
import ArticleDetail from '@/components/ArticleDetail'
import SaleAppointment from '@/components/SaleAppointment'
import NotFound from '@/components/NotFound'

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
      component: Login,
      meta: {
        breadcrumbs: 'ورود به حساب کاربری'
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        breadcrumbs: 'کنترل پنل'
      }
    },
    {
      path: '/article/:article_id',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/sale/:sale_id/appointment',
      name: 'SaleAppointment',
      component: SaleAppointment,
      meta: {
        breadcrumbs: 'کنترل پنل'
      }
    }
  ]
})

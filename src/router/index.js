import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Logout from '@/components/Logout'
import NotFound from '@/components/NotFound'
import SettingsAccount from '@/components/SettingsAccount'
import SettingsPassword from '@/components/SettingsPassword'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'TribeHang'
      }
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome,
      meta: {
        title: 'Welcome to TribeHang'
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/settings',
      name: 'Account',
      component: SettingsAccount,
      meta: {
        section: 'account',
        title: 'Account'
      }
    },
    {
      path: '/settings/account',
      name: 'SettingsAccount',
      component: SettingsAccount,
      meta: {
        section: 'account',
        title: 'Account'
      }
    },
    {
      path: '/settings/password',
      name: 'SettingsPassword',
      component: SettingsPassword,
      meta: {
        section: 'password',
        title: 'Account'
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: 'Page not found!'
      }
    }
  ]
})

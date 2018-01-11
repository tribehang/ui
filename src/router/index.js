import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Logout from '@/components/Logout'
import NotFound from '@/components/NotFound'
import SettingsAccount from '@/components/SettingsAccount'

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
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/settings',
      name: 'SettingsAccount',
      component: SettingsAccount
    },
    {
      path: '/settings/account',
      name: 'SettingsAccount',
      component: SettingsAccount
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

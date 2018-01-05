import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Logout from '@/components/Logout'
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
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

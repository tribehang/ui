import auth from '../auth'
import Vue from 'vue'
import router from './../router'

const USER_PATH = 'user'

export default {
  data () {
    return {
    }
  },
  setProfileDate (context) {
    if (localStorage.getItem('access_token') == null) {
      router.push('/login')
      return false
    }

    Vue.http.get(process.env.NODE_API_HOST + USER_PATH, {'headers': auth.getAuthHeader()}).then(response => {
      context.user = response.data.data
    }, response => {
      auth.refreshToken(context)
      setTimeout(() => {
        this.setProfileDate(context)
      }, 1000)
    })
  },
  getHomeUserData (context) {
    if (localStorage.getItem('access_token') != null) {
      Vue.http.get(process.env.NODE_API_HOST + USER_PATH, {'headers': auth.getAuthHeader()}).then(response => {
        context.userFirstName = response.data.data.firstName
        context.userActionName = 'خروج'
        context.userActionLink = '/logout'
        context.userActionPanel = '<a href="/profile">کنترل پنل</a>'
      }, response => {
      })
    }
  }
}

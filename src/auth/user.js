import auth from '../auth'
import Vue from 'vue'
import router from './../router'

const USER_PATH = 'users'
const ADDRESS_PATH = 'addresses'

export default {
  data () {
    return {
    }
  },
  setProfileDate (context) {
    if (localStorage.getItem('access_token') === null) {
      router.push('/login')
      return false
    }

    Vue.http.get(process.env.NODE_API_HOST + USER_PATH, {'headers': auth.getAuthHeader()}).then(response => {
      context.user = response.data.data
      context.userFirstName = response.data.data.firstName
      context.userLastName = response.data.data.lastName
      context.userEmail = response.data.data.email
      context.userDateOfBirth = response.data.data.dateOfBirth
    }, response => {
      auth.refreshToken(context)
      setTimeout(() => {
        this.setProfileDate(context)
      }, 1000)
    })
  },
  updateUser (firstName, lastName, email, dateOfBirth) {
    var userData = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'dateOfBirth': dateOfBirth
    }

    Vue.http.patch(process.env.NODE_API_HOST + USER_PATH, userData, {'headers': auth.getAuthHeader()}).then(response => {
      if (response.status === 200) {
        window.location.replace('/profile')
      }
    }, response => {
      console.log(response.data)
    })
  },
  getHomeUserData (context) {
    if (localStorage.getItem('access_token') !== null) {
      Vue.http.get(process.env.NODE_API_HOST + USER_PATH, {'headers': auth.getAuthHeader()}).then(response => {
        context.userFirstName = response.data.data.firstName
        context.userActionName = 'خروج'
        context.userActionLink = '/logout'
        context.userActionPanel = '<a href="/profile">کنترل پنل</a>'
      }, response => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      })
    }
  },
  getUserAddress (context, addressId) {
    Vue.http.get(process.env.NODE_API_HOST + ADDRESS_PATH + '/' + addressId, {'headers': auth.getAuthHeader()}).then(response => {
      context.selectedAddress = response.data.data
    }, response => {
    })
  }
}

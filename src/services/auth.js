import Vue from 'vue'
import router from './../router'

const REFRESH_TOKEN_PATH = 'auth/refresh_token'
const LOGIN_PATH = 'auth/signin'
const SIGNUP_PATH = 'auth/signup'
const USER_PATH = 'auth/users'

export default {

  user: {
    authenticated: false
  },

  logout () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    router.push('/')
  },

  signIn (context, email, password) {
    let credentials = {}

    credentials['username'] = email
    credentials['password'] = password
    credentials['client_id'] = process.env.NODE_APP_GATEWAY_CLIENT_ID
    credentials['client_secret'] = process.env.NODE_APP_GATEWAY_CLIENT_SECRET

    context.signInErrorMessage = ''

    Vue.http.post(process.env.NODE_APP_GATEWAY_HOST + LOGIN_PATH, credentials).then(response => {
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      router.push('/')
    }, response => {
      context.signInErrorMessage = 'Login Failed!'
    })
  },

  signUp (context, fullName, emailAddress, password) {
    let data = {
      'name': fullName,
      'email': emailAddress,
      'password': password
    }

    context.signUpErrorMessage = ''
    context.signUpSuccessMessage = ''

    Vue.http.post(process.env.NODE_APP_GATEWAY_HOST + SIGNUP_PATH, data).then(response => {
      context.signUpSuccessMessage = 'Sign up successful. Please check your email!'
    }, response => {
      context.signUpErrorMessage = 'Account creation Failed!'
    })
  },
  updateUser (data) {
    Vue.http.patch(process.env.NODE_APP_GATEWAY_HOST + USER_PATH, data, {'headers': this.getAuthHeader()}).then(response => {
      location.reload()
    }, response => {
      console.log('update failed!')
    })
  },
  getUser (context) {
    if (localStorage.getItem('access_token') !== null) {
      Vue.http.get(process.env.NODE_APP_GATEWAY_HOST + USER_PATH, {'headers': this.getAuthHeader()}).then(response => {
        context.user = response.data.data
      }, response => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        context.user = ''
        router.push('/welcome')
      })
    } else {
      router.push('/welcome')
    }
  },
  refreshToken (context) {
    let credentials = {
      'client_id': process.env.NODE_API_CLIENT_ID,
      'client_secret': process.env.NODE_API_CLIENT_SECRET,
      'refresh_token': localStorage.getItem('refresh_token')
    }
    context.$http.post(process.env.NODE_API_HOST + REFRESH_TOKEN_PATH, credentials).then(response => {
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      console.log(response.data.refresh_token)
      this.user.authenticated = true
    }, response => {
      window.location.replace('/login')
      console.log('refresh token expired, back to login please!')
    })
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}


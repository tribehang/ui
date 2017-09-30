import router from './../router'

const REFRESH_TOKEN_PATH = 'authentication/refresh_token'
const LOGIN_PATH = 'authentication/login'
const REGISTER_PATH = 'user'

export default {

  user: {
    authenticated: false
  },

  logout () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    this.user.authenticated = false
    router.push('/')
  },

  login (context, credentials) {
    credentials['client_id'] = process.env.NODE_API_CLIENT_ID
    credentials['client_secret'] = process.env.NODE_API_CLIENT_SECRET

    context.$http.post(process.env.NODE_API_HOST + LOGIN_PATH, credentials).then(response => {
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      this.user.authenticated = true
      window.location.replace('/profile')
    }, response => {
      context.loginError = 'اطلاعات وارد شده اشتباه است. لطفا مجددا اقدام کنید'
    })
  },

  register (context, credentials, redirect) {
    if (credentials['email'] === '' || credentials['password'] === '' || credentials['password_confirm'] === '') {
      context.registerError = 'لطفا فرم ثبت نام را کامل کنید'
      context.registerSuccess = ''
      return
    }

    if (credentials['password'] !== credentials['password_confirm']) {
      context.registerError = 'رمز عبور یکسان نیست'
      context.registerSuccess = ''
      return
    }

    context.registerError = ''

    context.$http.post(process.env.NODE_API_HOST + REGISTER_PATH, credentials).then(response => {
      context.registerSuccess = 'ثبت نام با موفقیت انجام شد'
    }, response => {
      context.registerError = 'اطلاعات وارد شده اشتباه است. لطفا مجددا اقدام کنید'
    })
  },

  refreshToken (context) {
    var credentials = {
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


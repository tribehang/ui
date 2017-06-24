import auth from '../auth'

const USER_PATH = 'user'

export default {

  getUserProfile (context) {
    context.$http.get(process.env.NODE_API_HOST + USER_PATH, {'headers': auth.getAuthHeader()}).then(response => {
      console.log(response.data)
    }, response => {
      auth.refreshToken(context)
      setTimeout(() => {
        this.getUserProfile(context)
      }, 1000)
    })
  }
}

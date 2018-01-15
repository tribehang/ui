import Vue from 'vue'

const PROFILE_IMAGE_PATH = 'auth/profile_images'

export default {

  getUserProfileImageUri (user) {
    if (user.profileImage.data.length === 0) {
      return process.env.NODE_APP_S3 + '/' + process.env.NODE_APP_S3_BUCKET + '/' + process.env.NODE_APP_S3_USER_PROFILE_BUCKET + '/noavatar-profile.jpg'
    } else {
      return process.env.NODE_APP_S3 + '/' + process.env.NODE_APP_S3_BUCKET + '/' + process.env.NODE_APP_S3_USER_PROFILE_BUCKET + '/' + user.id + '/' + user.profileImage.data.id + '.jpg'
    }
  },
  getUserProfileImageUriByUserProfileImageId (userId, userProfileImageId = '') {
    if (userProfileImageId === '') {
      return process.env.NODE_APP_S3 + '/' + process.env.NODE_APP_S3_BUCKET + '/' + process.env.NODE_APP_S3_USER_PROFILE_BUCKET + '/noavatar-profile.jpg'
    } else {
      return process.env.NODE_APP_S3 + '/' + process.env.NODE_APP_S3_BUCKET + '/' + process.env.NODE_APP_S3_USER_PROFILE_BUCKET + '/' + userId + '/' + userProfileImageId + '.jpg'
    }
  },
  setUserProfileImage (imageBase64) {
    let data = {}

    data['image'] = imageBase64

    Vue.http.post(process.env.NODE_APP_GATEWAY_HOST + PROFILE_IMAGE_PATH, data, {'headers': this.getAuthHeader()}).then(response => {
      location.reload()
    }, response => {
      console.log('failed')
    })
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}

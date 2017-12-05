import Vue from 'vue'
import auth from '../auth'

const ADDRESS = 'addresses'

export default {
  data () {
    return {
    }
  },
  createAddress (state, city, address, postcode, phoneNumber) {
    var addressData = {
      'state': state,
      'city': city,
      'address': address,
      'postcode': postcode,
      'phoneNumber': phoneNumber
    }

    Vue.http.post(process.env.NODE_API_HOST + ADDRESS, addressData, {'headers': auth.getAuthHeader()}).then(response => {
      if (response.status === 201) {
        window.location.hash = '#my-addresses'
        location.reload()
      }
    }, response => {
      console.log(response.data)
    })
  },
  deleteAddress (context, addressId) {
    Vue.http.delete(process.env.NODE_API_HOST + ADDRESS + '/' + addressId, {'headers': auth.getAuthHeader()}).then(response => {
      window.location.hash = '#my-addresses'
      location.reload()
    }, response => {
      console.log(response.data)
    })
  }
}

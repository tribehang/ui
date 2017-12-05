import Vue from 'vue'
import auth from '../auth'

const ADDRESS = 'addresses'
const BANK_ACCOUNT = 'bank_accounts'

export default {
  data () {
    return {
    }
  },
  createAddress (state, city, address, postcode, phoneNumber) {
    let addressData = {
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
  createBankAccount (fullName, bankName, bankAccount, bankCard, shabaNumber) {
    let bankAccountData = {
      'fullName': fullName,
      'bankName': bankName,
      'bankAccount': bankAccount,
      'bankCard': bankCard,
      'shabaNumber': shabaNumber
    }

    Vue.http.post(process.env.NODE_API_HOST + BANK_ACCOUNT, bankAccountData, {'headers': auth.getAuthHeader()}).then(response => {
      if (response.status === 201) {
        window.location.hash = '#my-bank-account'
        location.reload()
      }
    }, response => {
      console.log(response.data)
    })
  },
  deleteAddress (addressId) {
    Vue.http.delete(process.env.NODE_API_HOST + ADDRESS + '/' + addressId, {'headers': auth.getAuthHeader()}).then(response => {
      window.location.hash = '#my-addresses'
      location.reload()
    }, response => {
      console.log(response.data)
    })
  },
  deleteBankAccount (bankAccountId) {
    Vue.http.delete(process.env.NODE_API_HOST + BANK_ACCOUNT + '/' + bankAccountId, {'headers': auth.getAuthHeader()}).then(response => {
      window.location.hash = '#my-bank-account'
      location.reload()
    }, response => {
      console.log(response.data)
    })
  }
}

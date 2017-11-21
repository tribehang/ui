import Vue from 'vue'
import auth from '../auth'
import moment from 'moment'
import PDatePicker from '@/components/PDatePicker'

const APPOINTMENT_DATES_API = 'blanks?filter[location_id]='
const APPOINTMENT_LOCATIONS = 'locations'
const APPOINTMENT = 'appointments'
const SALE = 'sales'

export default {
  data () {
    return {
    }
  },
  createAppointment (saleId, locationId, startAt, endAt, dayNumber, user, selectedAddress) {
    var appointmentData = {
      'startAt': startAt,
      'endAt': endAt,
      'dayNumber': dayNumber,
      'name': user.firstName + ' ' + user.lastName,
      'emailAddress': user.email,
      'phoneNumber': selectedAddress.phoneNumber,
      'country': 'Iran',
      'state': selectedAddress.state,
      'city': selectedAddress.city,
      'street': selectedAddress.address,
      'postalCode': selectedAddress.postcode,
      'location_id': locationId
    }

    Vue.http.post(process.env.NODE_APPOINTMENT_API_HOST + APPOINTMENT, appointmentData).then(response => {
      if (response.status === 201) {
        this.updateSaleAppointment(saleId, response.data.data.id)
      }
    }, response => {
      console.log(response.data)
    })
  },
  updateSaleAppointment (saleId, appointmentId) {
    let saleData = {
      'appointment_id': appointmentId
    }

    Vue.http.patch(process.env.NODE_API_HOST + SALE + '/' + saleId, saleData, {'headers': auth.getAuthHeader()}).then(response => {
      if (response.status === 200) {
        window.location.reload()
      }
    }, response => {
      console.log(response.data)
    })
  },
  getAppointmentDates (context, locationId) {
    Vue.http.get(process.env.NODE_APPOINTMENT_API_HOST + APPOINTMENT_DATES_API + locationId).then(response => {
      var appointmentDays = response.data

      if (appointmentDays.length > 0) {
        context.appointmentFirstDayAvailable = appointmentDays[0]['date']
        context.appointmentLastDayAvailable = appointmentDays[appointmentDays.length - 1]['date']

        context.appointmentAvailableDaysNum = this.getAppointmentAvailableDaysNum(context.appointmentLastDayAvailable)

        context.appointmentDays = appointmentDays
      }
    }, response => {
    })

    console.log('list updated')
  },
  getAppointmentAvailableDaysNum (futureDate) {
    return moment(futureDate).diff(moment(), 'days') + 3
  },
  updateDayChosenForSale (context, appointmentDate, saleId) {
    this.getAppointmentDates(context)

    var hours = []
    var index = 0

    context.appointmentDays.forEach(function (element) {
      if (element['date'] === appointmentDate) {
        if (saleId in hours === false) {
          hours[saleId] = []
        }

        if (appointmentDate in hours[saleId] === false) {
          hours[saleId][appointmentDate] = []
        }

        hours[saleId][appointmentDate][index] = PDatePicker.methods.convertDigitsETP(
            element['endAt'] + ' - ' + element['startAt']
        )
        index++
      }
    })

    context.daysHours = hours
  },
  getLocations (context) {
    Vue.http.get(process.env.NODE_APPOINTMENT_API_HOST + APPOINTMENT_LOCATIONS).then(response => {
      context.locations = response.data.data
    }, response => {
      console.log(response)
    })
  },
  getFormattedStartAt (selectedTime) {
    return PDatePicker.methods.convertDigitsPTE(selectedTime).split(' - ')[1]
  },
  getFormattedEndAt (selectedTime) {
    return PDatePicker.methods.convertDigitsPTE(selectedTime).split(' - ')[0]
  }
}

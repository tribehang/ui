import Vue from 'vue'
import moment from 'moment'
import PDatePicker from '@/components/PDatePicker'

const APPOINTMENT_DATES_API = 'blanks?filter[location_id]='
const APPOINTMENT_LOCATIONS = 'locations'

export default {
  data () {
    return {
    }
  },
  createAppointment (saleId, addressId, startAt, endAt, dayNumber, user, selectedAddress) {
    // create appointment

    // update sale's appointment ID
    console.log('creating appointment')
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

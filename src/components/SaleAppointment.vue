<template>
    <div>
        <div class="container">
            <div class="my-sales row">
                <h3 v-if="sale.category">
                    {{ sale.category.data.parentName }} {{ sale.category.data.name }}
                </h3>

                <div class="row" v-if="sale.saleStatus">
                    <div class="col-sm-3">
                        <img :src="getSaleImageLink(sale.id, sale.images.data[0].id)" alt="imageThumbnail" class="img-thumbnail">
                    </div>
                    <div class="col-sm-3">
                        <i class="fa fa-question-circle-o"></i>
                        <strong  v-translate>STATUS</strong>:
                        <span :class="sale.saleStatus" style="pointer-events: none" v-translate>SL_{{sale.saleStatus}}</span>
                    </div>
                    <div class="col-sm-6">
                        <i class="fa fa-calendar"></i>
                        <strong  v-translate>SALE_CREATION_DATETIME</strong>:
                        <span>{{ sale.createdAt }}</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-3">
                    </div>
                    <div class="col-sm-3">
                        <i class="fa fa-clock-o"></i>
                        <strong  v-translate>SALE_USAGE_IN_MONTHS</strong>:
                        <span>{{sale.usageInMonths}} <span v-translate>MONTH</span></span>
                    </div>
                    <div class="col-sm-6">
                        <i class="fa fa-file-text-o"></i>
                        <strong  v-translate>CUSTOMER_NOTE</strong>:
                        <span> --- </span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-3">
                    </div>
                    <div class="col-sm-3">
                        <i class="fa fa-gg"></i>
                        <strong  v-translate>SALE_INITIAL_PRICE</strong>:
                        <span> --- </span>
                    </div>
                    <div class="col-sm-6">
                        <i class="fa fa-pencil"></i>
                        <strong  v-translate>SEMSARI_NOTE</strong>:
                        <span> --- </span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-3">
                    </div>
                    <div class="col-sm-3">
                        <i class="fa fa-gg-circle"></i>
                        <strong  v-translate>SALE_FINAL_PRICE</strong>:
                        <span> --- </span>
                    </div>
                </div>
            </div>
            <div class="row" v-if="sale.saleStatus === 'created'">
                <div class="form-group col-sm-3">
                    <select v-model="selectedLocationId" class="form-control" v-on:change="changeLocation">
                        <option disabled value="" v-translate>SELECT_LOCATION</option>
                        <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
                    </select>
                </div>

                <div class="form-group col-sm-3" v-if="selectedLocationId !== ''">
                    <pdatepicker class="form-control" @dateChosen="onClickDateChosen(sale.id, $event)" name="date" :id="sale.id" headerBackgroundColor="orange" :availableDaysNum="appointmentAvailableDaysNum"></pdatepicker>
                </div>

                <div class="form-group col-sm-2" v-if="daysHours[sale.id]" >
                    <select class="form-control" v-on:change="changeHour" v-model.trim="selectedHour">
                        <option :value="daysHour"  v-for="daysHour in daysHours[sale.id][dayChosenForSale[sale.id]]">{{ daysHour }}</option>
                    </select>
                </div>
            </div>
            <div class="row" v-if="sale.saleStatus === 'created'">
                <label v-if="daysHours[sale.id]" class="form-group">

                    <div v-if="getSelectedHourLength() > 0">
                        <div v-for="address in user.addresses.data">
                            <input type="radio" :value="address.id" v-model="selectedAddressId" v-on:change="updateAddress">
                            <label>
                                {{ address.state }}, {{ address.city }}, {{ address.address }}, <span v-translate>POSTAL_CODE</span> {{ address.postcode }} , (<span v-translate>CONTACT_NUMBER</span> : {{ address.phoneNumber }} )
                            </label>
                        </div>
                    </div>

                    <button v-on:click="setAppointment" v-translate v-if="getSelectedHourLength() > 0" type="button" class="btn btn-info" style="float: right;">CONFIRM</button>
                </label>
            </div>

            <div class="container row" v-if="sale.saleStatus === 'PRICE_ESTIMATED'">
                <h4 v-translate>APPOINTMENT_DATE_AND_TIME</h4>

                <div class="row">
                    {{ saleAppointment.state }}, {{ saleAppointment.city }}, {{ saleAppointment.street }}, <span v-translate>POSTAL_CODE</span> {{ saleAppointment.postalCode }} , (<span v-translate>CONTACT_NUMBER</span> : {{ saleAppointment.phoneNumber }} )
                </div>
                <br>
                <div class="row">
                    <span class="alert alert-info">
                       {{ getFormattedDateAndTime(saleAppointment.startAt) }}
                    </span>
                </div>
            </div>

            <a href="/profile/#items" v-translate class="btn btn-success" style="float: left;">BACK_TO_ITEMS</a>

        </div>
    </div>
</template>

<script>
  import sale from '../services/sale'
  import moment from 'moment'
  import appointment from '../services/appointment'
  import user from '../auth/user'
  import PDatePicker from '@/components/PDatePicker'

  export default {
    components: {'pdatepicker': PDatePicker},
    data () {
      return {
        saleId: this.$route.params.sale_id,
        locations: [],
        user: '',
        sale: '',
        appointmentAvailableDaysNum: 0,
        daysHours: [],
        appointmentFirstDayAvailable: '',
        appointmentLastDayAvailable: '',
        appointmentDays: [],
        dayChosenForSale: [],
        selectedHour: '',
        selectedLocationId: '',
        selectedAddress: '',
        selectedAddressId: '',
        saleAppointment: ''
      }
    },
    methods: {
      updateAddress () {
        user.getUserAddress(this, this.selectedAddressId)
      },
      getSelectedHourLength () {
        return this.selectedHour === undefined ? 0 : this.selectedHour.length
      },
      changeHour () {
        console.log('handle hour')
      },
      onClickDateChosen (saleId, chosenDate) {
        appointment.updateDayChosenForSale(this, chosenDate, saleId)
        this.dayChosenForSale[saleId] = chosenDate
        this.selectedHour = ''
      },
      getSaleImageLink ($saleId, $saleImageId) {
        return sale.getSaleImageLink($saleId, $saleImageId)
      },
      changeLocation () {
        appointment.getAppointmentDates(this, this.selectedLocationId)
      },
      setAppointment () {
        var selectedDate = $('#' + this.sale.id).attr('date-value')
        var startAt = selectedDate + ' ' + appointment.getFormattedStartAt(this.selectedHour)
        var endAt = selectedDate + ' ' + appointment.getFormattedEndAt(this.selectedHour)
        var dayNumber = moment(selectedDate).isoWeekday()

        appointment.createAppointment(
          this.sale.id,
          this.selectedLocationId,
          startAt,
          endAt,
          dayNumber,
          this.user,
          this.selectedAddress
        )
      },
      getAppointment () {
        console.log(this.saleId)
      },
      getFormattedDateAndTime (dateTime) {
        if (dateTime !== undefined) {
          var dateAndTimeSplit = dateTime.split(' ')
          var timeSplit = dateAndTimeSplit[1].split(':')
          var timeFormatted = PDatePicker.methods.convertDigitsETP(timeSplit[0] + ':' + timeSplit[1])

          var dateSplit = dateAndTimeSplit[0].split('-')
          var dateSplitFormatted = PDatePicker.methods.gregorian_to_jalali(parseInt(dateSplit[0]), parseInt(dateSplit[1]), parseInt(dateSplit[2]))

          var dateFormatted = PDatePicker.methods.convertDigitsETP(dateSplitFormatted[2].toString()) +
            ' ' + PDatePicker.data()['monthNames'][dateSplitFormatted[1] - 1] +
            ' ' + PDatePicker.methods.convertDigitsETP(dateSplitFormatted[0].toString())
          return dateFormatted + ' - ساعت ' + timeFormatted
        }
      }
    },
    created () {
      user.setProfileDate(this)
      sale.getSale(this, this.saleId)
      appointment.getLocations(this)
    }
  }
</script>

<style scoped>
    .container {
        background-color: #ffffff;
        margin-bottom: 20px;
        padding: 30px;
        box-shadow: 2px 2px 6px #CCC;
        padding-top: 10px;
    }

    input[type="radio"]{
        float: right;
        display: inline-block;
        width: 15px;
        margin-left: 10px;
    }
</style>

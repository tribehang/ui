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
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group col-sm-6">
                        <select v-model="selectedLocationId" class="form-control" v-on:change="changeLocation">
                            <option disabled value="" v-translate>SELECT_LOCATION</option>
                            <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
                        </select>
                    </div>

                    <div class="form-group col-sm-6" v-if="selectedLocationId !== ''">
                        <pdatepicker class="form-control" @dateChosen="onClickDateChosen(sale.id, $event)" name="date" :id="sale.id" headerBackgroundColor="orange" :availableDaysNum="appointmentAvailableDaysNum"></pdatepicker>
                    </div>

                    <div class="form-group col-sm-4" v-if="daysHours[sale.id]" >
                        <select class="form-control" v-on:change="changeHour" v-model.trim="selectedHour">
                            <option :value="daysHour"  v-for="daysHour in daysHours[sale.id][dayChosenForSale[sale.id]]">{{ daysHour }}</option>
                        </select>
                    </div>

                    <label v-if="daysHours[sale.id]" class="form-group">
                        <button v-on:click="setAppointment" v-translate v-if="getSelectedHourLength() > 0" type="button" class="btn btn-info" style="float: left;">CONFIRM</button>
                    </label>
                </div>
            </div>
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
        selectedLocationId: ''
      }
    },
    methods: {
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
        console.log('Location ID: ' + this.selectedLocationId)
        console.log('Sale ID: ' + this.sale.id)

        var selectedDate = $('#' + this.sale.id).attr('date-value')
        var startAt = selectedDate + ' ' + appointment.getFormattedStartAt(this.selectedHour)
        var endAt = selectedDate + ' ' + appointment.getFormattedEndAt(this.selectedHour)

        console.log('startAt : ' + startAt)
        console.log('endAt: ' + endAt)
        console.log('dayNumber: ' + moment(selectedDate).isoWeekday())
        console.log('name: ' + this.user.firstName + ' ' + this.user.lastName)
        console.log('phoneNumber: 12345678')
        console.log('emailAddress: ' + this.user.email)

        // todo - must come from one of user's addresses
        console.log('country: iran')
        console.log('state: tehran')
        console.log('city: tehran')
        console.log('street: street')
        console.log('postcode: postal code')
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
</style>

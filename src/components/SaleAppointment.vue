<template>
    <div>
        <div class="container">
            <div class="my-sales row">
                <h3 v-if="sale.category">
                    {{ sale.category.data.parentName }} {{ sale.category.data.name }}
                </h3>

                <div class="row" v-if="sale.saleStatus">
                    <div class="col-sm-3">
                        <section class="center slider" style="position: relative; left: -15px;" v-if="sale.images.data[0]">
                            <slick ref="slick" :options="slickOptions">
                                <div class="pro-cart" v-for="saleImage in sale.images.data">
                                    <div>
                                        <img :src="getSaleImageLink(sale.id, saleImage.id)" class="img-thumbnail"/>
                                    </div>
                                </div>
                            </slick>
                        </section>
                        <!--<img :src="getSaleImageLink(sale.id, sale.images.data[0].id)" alt="imageThumbnail" class="img-thumbnail">-->
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
            <div class="row" v-if="sale.saleStatus === 'PRICE_ESTIMATED'">
                <div class="form-group col-sm-3" v-if="!sale.saleInternalLogistic">
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
            <div class="row" v-if="sale.saleStatus === 'PRICE_ESTIMATED'">
                <label v-if="daysHours[sale.id]" class="form-group col-md-12">

                    <div v-if="getSelectedHourLength() > 0">
                        <h4 v-if="userHasAddress" v-translate>CHOOSE_YOUR_ADDRESS</h4>
                        <div>
                            <div class="radio" v-for="address in user.addresses.data">
                                <label><input type="radio" name="address" :value="address.id" v-model="selectedAddressId" v-on:change="updateAddress">{{ address.state }}, {{ address.city }}, {{ address.address }}, <span v-translate>POSTAL_CODE</span> {{ address.postcode }} , (<span v-translate>CONTACT_NUMBER</span> : {{ address.phoneNumber }} )</label>
                            </div>
                        </div>

                        <hr>
                        <h4 v-if="userHasBankAccount" v-translate>CHOOSE_YOUR_BANK_ACCOUNT</h4>
                        <div>
                            <div class="radio" v-for="bankAccount in user.bankAccounts.data">
                                <label class="col-md-12"><input type="radio" name="bankAccount" :value="bankAccount.id" v-model="selectedBankAccountId">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-2 bold" v-translate>FULL_NAME</div>
                                            <div class="col-md-4 bold">{{ bankAccount.fullName }}</div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-2 bold" v-translate>BANK_NAME</div>
                                            <div class="col-md-4 bold">{{ bankAccount.bankName }}</div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-2 bold" v-translate>BANK_ACCOUNT_NUMBER</div>
                                            <div class="col-md-4 bold">{{ bankAccount.bankAccount }}</div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-2 bold" v-translate>BANK_ACCOUNT_CARD_NUMBER</div>
                                            <div class="col-md-4 bold">{{ bankAccount.bankCard }}</div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-2 bold" v-translate>BANK_ACCOUNT_SHABA</div>
                                            <div class="col-md-4 bold">{{ bankAccount.shabaNumber }}</div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <br>

                        <div class="row">
                            <div v-if="userHasAddress === false">
                                <h4 v-translate>APPOINTMENT_NO_ADDRESS_ERROR_MESSAGE</h4>
                                <button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target="#add-new-address-modal" v-translate>ADD_NEW_ADDRESS</button>
                            </div>

                            <br>

                            <div v-if="userHasBankAccount === false">
                                <h4 v-translate>APPOINTMENT_NO_BANK_ACCOUNT_ERROR_MESSAGE</h4>
                                <button type="button" class="btn btn-success btn-md" data-toggle="modal" data-target="#add-new-bank-account-modal" v-translate>ADD_NEW_BANK_ACCOUNT</button>
                            </div>

                            <div v-else>

                                <div class="checkbox">
                                    <label class="checkbox-inline">
                                        <input v-model="terms_conditions" v-bind:true-value=1 v-bind:false-value=0 style="left: 0px; top: -10px;" type="checkbox">
                                    </label><span v-translate>SALE_TERMS_CONDITION</span>
                                </div>

                                <button v-on:click="setAppointment" v-translate v-if="getSelectedHourLength() > 0" type="button" class="btn btn-info" style="float: right;">CONFIRM</button>
                            </div>
                        </div>
                    </div>
                </label>
            </div>

            <div class="container row" v-if="sale.saleInternalLogistic">
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

            <a href="/profile#items" v-translate class="btn btn-success" style="float: left;">BACK_TO_ITEMS</a>

        </div>

        <div class="modal fade" id="add-new-address-modal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" v-translate>ADD_NEW_ADDRESS</h4>
                    </div>
                    <div class="modal-body">
                        <h4 v-translate>NEW_ADDRESS_INFORMATION</h4>
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="control-label col-sm-2 bold" for="state" v-translate>STATE</label>
                                <div class="col-sm-10">
                                    <label class="col-md-6">
                                        <select class="form-control" v-model="addressState">
                                            <option value="تهران">تهران</option>
                                        </select>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-2 bold" for="city" v-translate>CITY</label>
                                <div class="col-sm-10">
                                    <label class="col-md-6">
                                        <select class="form-control" v-model="addressCity">
                                            <option value="تهران">تهران</option>
                                        </select>
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-2 bold" for="contact_number" v-translate>CONTACT_NUMBER</label>
                                <div class="col-sm-10">
                                    <label class="col-md-6">
                                        <input v-model="addressPhoneNumber" type="text" class="form-control" id="contact_number" name="contact_number">
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-2 bold" for="postal_code" v-translate>POSTAL_CODE</label>
                                <div class="col-sm-10">
                                    <label class="col-md-6">
                                        <input v-model="addressPostcode" type="text" class="form-control" id="postal_code" name="postal_code">
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-2 bold" for="full_address" v-translate>FULL_ADDRESS</label>
                                <div class="col-sm-10">
                                    <label class="col-md-12">
                                        <input v-model="addressAddress" type="text" class="form-control" id="full_address" name="full_address">
                                    </label>
                                </div>
                            </div>

                            <br>

                            <button type="button" class="btn btn-success" v-on:click="createAddress">
                                <span v-translate>REGISTER_NEW_ADDRESS</span>
                            </button>

                            <button type="button"  data-dismiss="modal" class="btn btn-warning">
                                <span v-translate>CANCEL</span>
                            </button>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-translate>CLOSE</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="add-new-bank-account-modal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" v-translate>ADD_NEW_BANK_ACCOUNT</h4>
                    </div>
                    <div class="modal-body">
                        <h4 v-translate>BANK_ACCOUNT_INFORMATION</h4>
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="control-label col-sm-3 bold" for="bank_account_fullname" v-translate>FULL_NAME</label>
                                <div class="col-sm-9">
                                    <label class="col-md-8">
                                        <input v-model="bankAccountFullName" type="text" class="form-control" id="bank_account_fullname" name="bank_account_fullname">
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-3 bold" for="bank_account_bank_name" v-translate>BANK_NAME</label>
                                <div class="col-sm-9">
                                    <label class="col-md-8">
                                        <input v-model="bankAccountBankName" type="text" class="form-control" id="bank_account_bank_name" name="bank_account_bank_name">
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-3 bold" for="bank_account_number" v-translate>BANK_ACCOUNT_NUMBER</label>
                                <div class="col-sm-9">
                                    <label class="col-md-8">
                                        <input v-model="bankAccountNumber" type="text" class="form-control" id="bank_account_number" name="bank_account_number">
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-3 bold" for="bank_account_card_number" v-translate>BANK_ACCOUNT_CARD_NUMBER</label>
                                <div class="col-sm-9">
                                    <label class="col-md-8">
                                        <input v-model="bankAccountCardNumber" type="text" class="form-control" id="bank_account_card_number" name="bank_account_card_number">
                                    </label>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="control-label col-sm-3 bold" for="bank_account_shaba" v-translate>BANK_ACCOUNT_SHABA</label>
                                <div class="col-sm-9">
                                    <label class="col-md-8">
                                        <input v-model="bankAccountShaba" type="text" class="form-control" id="bank_account_shaba" name="bank_account_shaba">
                                    </label>
                                </div>
                            </div>

                            <br>

                            <button type="button" class="btn btn-success" v-on:click="createBankAccount">
                                <span v-translate>REGISTER_BANK_ACCOUNT</span>
                            </button>

                            <button type="button"  data-dismiss="modal" class="btn btn-warning">
                                <span v-translate>CANCEL</span>
                            </button>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" v-translate>CLOSE</button>
                    </div>
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
  import profile from '../services/profile'

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
        selectedBankAccountId: '',
        saleAppointment: '',
        userHasAddress: false,
        userHasBankAccount: false,
        addressState: 'تهران',
        addressCity: 'تهران',
        addressAddress: '',
        addressPostcode: '',
        addressPhoneNumber: '',
        bankAccountFullName: '',
        bankAccountBankName: '',
        bankAccountNumber: '',
        bankAccountCardNumber: '',
        bankAccountShaba: '',
        terms_conditions: 0
      }
    },
    methods: {
      createAddress () {
        profile.createAddress(this.addressState, this.addressCity, this.addressAddress, this.addressPostcode, this.addressPhoneNumber)
      },
      createBankAccount () {
        profile.createBankAccount(this.bankAccountFullName, this.bankAccountBankName, this.bankAccountNumber, this.bankAccountCardNumber, this.bankAccountShaba)
      },
      updateAddress () {
        user.getUserAddress(this, this.selectedAddressId)
      },
      getSelectedHourLength () {
        return this.selectedHour === undefined ? 0 : this.selectedHour.length
      },
      changeHour () {
        if (this.user.addresses.data.length > 0) {
          this.userHasAddress = true
        }

        if (this.user.bankAccounts.data.length > 0) {
          this.userHasBankAccount = true
        }
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
        var selectedDate = $('#' + this.sale.id).attr('datevalueprop')
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
    .checkbox{
        margin-top: 100px;
        margin-bottom: 40px;
    }

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

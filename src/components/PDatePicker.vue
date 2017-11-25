<template>
    <div class="pdatepicker" v-bind:class="{ 'inline' : inlineMode, wrapperClass }">
        <input :id="id"
            type="text"
               @click="inputClicked"
               :value="formatedChosenDate"
               @change="inputChanged($event.target.value)"
               :class="inputClass"
               :name="name"
               :dateValueProp="dateValue"
               :placeholder="placeholder">
        <transition :name="openTransitionAnimation">
            <div class='dialog' :class="dialogClass" v-if='isDialogOpen' v-bind:style="{ background: dialogBackgroundColor, color: dialogColor}">

                <div class='day-view' v-if='isDayView'>
                    <div class="dialog-header" v-bind:style='{background : headerBackgroundColor, color: headerColor}'>
                        <div class='dialog-month'>
                            <div class="nextMonth" @click='nextMonthClicked'><</div>
                            <div class="monthName" v-bind:class="{pointer: showAllMonthsNavigation }" @click='monthNameClicked'>{{ displayingMonth }} {{ transformYear(displayingYear) }}</div>
                            <div class="preMonth" @click='preMonthClicked'>></div>
                        </div>
                    </div>

                    <div class='dialog-days'>
                        <span v-if="showDaysName" class='day-box day-name' v-for='dayName in dayNames'>
                            {{ dayName }}
                        </span>
                        <span class='day-box empty-box' v-for='n in firstDayOfMonth'></span><template v-for='n in daysInMonth'>
                        <span class='day-box'
                                v-bind:class='{ chosenDay : ifDayBoxIsChosenDay(n), disabled : ifDayBoxDisabled(n) }'
                                @click='dayClicked(n)'>{{ transformDay(n) }}</span>
                    </template>
                    </div>
                    <div class='dialog-today'>
                       <span v-if="showTodayButton === true" v-translate @click='goToTodayAndClose'>TODAY</span>
                       <span style="float: left; margin-left: 5px;" v-translate @click='closeDialog'>CLOSE</span>
                    </div>
                </div>
                <div class='year-view' v-if='isMonthView'>
                    <div class="dialog-header" v-bind:style='{background : headerBackgroundColor, color: headerColor}'>
                        <div class='dialog-year'>
                            <div class="cyear">
                              <label>
                                <select class="form-control" v-on:click="updateYearSelectedMenu" v-model="yearSelectedMenu">
                                    <option :value="option" v-for="option in yearsSelectMenu">{{ transformYear(option) }}</option>
                                </select>
                            </label></div>
                        </div>
                    </div>
                    <div class='dialog-months'>
                        <template v-for='(n, i) in monthNames'>
                            <div class='month-box'
                                v-bind:class='{ chosenMonth : ifMonthBoxChosenMonth(i) }'
                                @click='monthClicked(i)'>{{ n }}</div>
                        </template>
                    </div>
                    <div class='dialog-today'>
                        <span style="float: left; margin-left: 5px;" v-translate @click='closeDialog'>CLOSE</span>
                    </div>
                </div>
            </div>
        </transition>
  </div>
</template>

<script>
var jalali = require('jalaali-js')
import moment from 'moment'

export default {
  name: 'PDatePicker',
  props: {'placeholder': {'default': 'یک تاریخ را انتخاب کنید', String},
    'headerBackgroundColor': {'default': '#137e95'},
    'headerColor': {'default': 'white'},
    'dialogColor': {'default': 'black'},
    'dialogBackgroundColor': {'default': '#fafafa'},
    'value': {'default': ''},
    'name': {'default': '', type: String},
    'required': {'default': false, Boolean},
    'id': {'default': '', String},
    'inputClass': {'default': '', String},
    'dialogClass': {'default': '', String},
    'wrapperClass': {'default': '', String},
    'initialView': {'default': 'day', String, validator (value) { return value === 'day' || value === 'month' }},
    'inlineMode': { 'default': false, Boolean },
    'formatDate': {
      'default': 'yyyy/MM/dd',
      String,
      validator (value) {
        let elements = value.split('/')
        if (elements.length !== 3) return false
        if (elements[0] !== 'yyyy' && elements[0] !== 'yy') return false
        if (elements[1] !== 'M' && elements[1] !== 'MM' && elements[1] !== 'MMM') return false
        if (elements[2] !== 'd' && elements[2] !== 'dd') return false
        return true
      }
    },
    'openTransitionAnimation': {'default': 'slide-fade', String},
    'persianDigits': true,
    'availableDaysNum': {'default': 30},
    'showTodayButton': {'default': true, Boolean},
    'showAllMonthsNavigation': {'default': false, Boolean},
    'minimumYear': {'default': 1395},
    'showDaysName': {'default': true, Boolean},
    'dateValueProp': {'default': '', String}
  },
  data () {
    return {
      isDialogOpen: false,
      isDayView: false,
      isMonthView: false,
      dayNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', 'پنج شنبه', 'جمعه'],
      monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
      dayInThisMonth: 1,
      firstDayOfMonth: 0,
      daysInMonth: 30,
      gtoday: [1380, 1, 1],
      displayingMonthNum: 1,
      displayingMonth: '',
      displayingYear: 1300,
      dayOfWeek: 0,
      chosenDate: '',
      formatedChosenDate: '',
      chosenDay: 1,
      chosenMonth: 1,
      chosenYear: 1396,
      maximumYear: 1397,
      yearsSelectMenu: [],
      yearSelectedMenu: 1396,
      dateValue: ''
    }
  },
  mounted () {
    if (this.inputCheck(this.value)) {
      this.inputChanged(this.value)
    } else {
      this.goToToday()
    }
    if (this.inlineMode) {
      this.openDialog()
    }
    this.updateYearsSelectMenu()
  },
  watch: {
    value: function (value) {
      this.inputChanged(value)
    }
  },
  methods: {
    updateYearSelectedMenu () {
      this.displayingYear = this.yearSelectedMenu
    },
    updateYearsSelectMenu () {
      let i

      for (i = this.chosenYear; i >= this.minimumYear; i--) {
        this.yearsSelectMenu.push(i)
      }
    },
    goToTodayAndClose () {
      this.goToToday()
      this.dayClicked(this.chosenDay)
    },
    transformYear (yearNumber) {
      return this.convertDigitsETP(yearNumber.toString())
    },
    transformDay (dayNumber) {
      var daysInPersian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۱۰', '۱۱', '۱۲', '۱۳', '۱۴', '۱۵', '۱۶', '۱۷', '۱۸', '۱۹', '۲۰', '۲۱', '۲۲', '۲۳', '۲۴', '۲۵', '۲۶', '۲۷', '۲۸', '۲۹', '۳۰', '۳۱']
      return daysInPersian[dayNumber]
    },
    inputClicked () {
      if (!this.isDialogOpen) {
        this.openDialog()
      } else { this.closeDialog() }
    },
    openDialog () {
      if (this.isDialogOpen) return
      this.isDialogOpen = true
      if (this.initialView === 'day') {
        this.isDayView = true
        this.isMonthView = false
      } else {
        this.isDayView = false
        this.isMonthView = true
      }
      this.$emit('opened', this.value)
    },
    closeDialog () {
      if (!this.inlineMode) {
        this.isDialogOpen = false
        this.$emit('closed', this.value)
      }
    },
    inputCheck (value) {
      if (value !== '') {
        let els = value.split('/')
        if (els.length === 3) {
          let year = parseInt(this.convertDigitsPTE(els[0]))
          let month = parseInt(this.convertDigitsPTE(els[1]))
          let day = parseInt(this.convertDigitsPTE(els[2]))
          if (isNaN(month)) {
            month = this.monthNames.indexOf(els[1]) + 1
          }
          if (!isNaN(year) && !isNaN(day) && month !== -1) {
            if (month < 1 || month > 12) return false
            if (month <= 6 && (day < 1 || day > 31)) return false
            if (month > 6 && (day < 1 || day > 30)) return false
            if (year < 1300) year += 1300
            if (year < this.minimumYear || year > this.maximumYear) return false
            return true
          }
        }
      }
      return false
    },
    inputChanged (value) {
      if (this.inputCheck(value)) {
        let els = value.split('/')
        let year = parseInt(this.convertDigitsPTE(els[0]))
        let month = parseInt(this.convertDigitsPTE(els[1]))
        let day = parseInt(this.convertDigitsPTE(els[2]))
        if (isNaN(month)) {
          month = this.monthNames.indexOf(els[1]) + 1
        }
        this.goToMonth(year, month - 1)
        this.updateInput()
        this.dayClicked(day)
      }
    },
    ifDayBoxIsChosenDay (day) {
      var currentGregorianDate = this.jalali_to_gregorian(this.chosenYear, this.chosenMonth, this.chosenDay)
      var checkingDate = this.jalali_to_gregorian(this.displayingYear, this.displayingMonthNum + 1, day)

      return currentGregorianDate[0] === checkingDate[0] &&
        currentGregorianDate[1] === checkingDate[1] &&
        currentGregorianDate[2] === checkingDate[2]
    },
    ifDayBoxDisabled (day) {
      var myDatInJalali = this.gregorian_to_jalali(parseInt(moment().format('Y')), parseInt(moment().format('M')), parseInt(moment().format('D')))
      var date1 = new Date(myDatInJalali[0] + '/' + myDatInJalali[1] + '/' + myDatInJalali[2])
      var date2 = new Date(this.displayingYear + '/' + (this.displayingMonthNum + 1) + '/' + day)
      var timeDiff = date2.getTime() - date1.getTime()
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

      if (this.showAllMonthsNavigation) {
        return false
      }

      return (diffDays < 0 || diffDays >= this.availableDaysNum)
    },
    ifMonthBoxChosenMonth (month) {
      return this.chosenYear === this.displayingYear &&
        this.chosenMonth === month + 1
    },
    goToToday () {
      let today = new Date()
      this.gtoday = this.gregorian_to_jalali(today.getFullYear(), today.getMonth() + 1, today.getDate())
      this.goToMonth(this.gtoday[0], this.gtoday[1] - 1)
      this.chosenDay = this.gtoday[2]
      this.chosenMonth = this.gtoday[1]
      this.chosenYear = this.gtoday[0]
    },
    goToMonth (year, month) {
      var gfirstOfMonth = this.jalali_to_gregorian(year, month + 1, 1)
      var firstOfMonth = new Date(gfirstOfMonth[0], gfirstOfMonth[1] - 1, gfirstOfMonth[2] + 1)
      this.firstDayOfMonth = (firstOfMonth.getDay()) % 7
      this.daysInMonth = this.gatDaysInMonth(month)
      this.displayingMonthNum = month

      let yearch = this.displayingYear !== year
      let monthch = this.displayingMonth !== this.monthNames[month]

      this.displayingYear = year
      this.displayingMonth = this.monthNames[month]

      if (monthch) { this.$emit('monthChanged', this.value) }
      if (yearch) { this.$emit('yearChanged', this.value) }
    },
    gatDaysInMonth (monthNumber) {
      return monthNumber <= 5 ? 31 : 30
    },
    preMonthClicked () {
      let newMonth = this.displayingMonthNum - 1
      let newYear = this.displayingYear
      if (newMonth < 0 && newYear - 2 <= this.minimumYear) {
        newMonth = 11
        newYear--
      }

      if (this.showAllMonthsNavigation) {
        this.goToMonth(newYear, newMonth)
      }

      if (newYear >= this.minimumYear) {
        this.goToMonth(newYear, newMonth)
      }
    },
    nextMonthClicked () {
      let newMonth = this.displayingMonthNum + 1
      let newYear = this.displayingYear
      if (newMonth > 11 && newYear + 2 >= this.maximumYear) {
        newMonth = 0
        newYear++
      }

      if (this.showAllMonthsNavigation) {
        this.goToMonth(newYear, newMonth)
      }

      if (newYear <= this.maximumYear) {
        this.goToMonth(newYear, newMonth)
      }
    },
    dayClicked (day) {
      this.chosenDay = day
      this.chosenMonth = this.displayingMonthNum + 1
      this.chosenYear = this.displayingYear
      this.updateInput()
      this.closeDialog()
      var formattedMonth = this.chosenMonth.length === 2 ? this.chosenMonth : '0' + this.chosenMonth
      var dateValueGreogrian = this.jalali_to_gregorian(this.chosenYear, formattedMonth, this.chosenDay)
      var chosenGregorianDate = this.jalali_to_gregorian(this.chosenYear, formattedMonth, this.chosenDay)
      var chosenGregorianDateMonth = chosenGregorianDate[1].toString().length === 2 ? chosenGregorianDate[1] : '0' + chosenGregorianDate[1]
      var chosenGregorianDateDay = chosenGregorianDate[2].toString().length === 2 ? chosenGregorianDate[2] : '0' + chosenGregorianDate[2]
      this.dateValue = dateValueGreogrian[0] + '-' + chosenGregorianDateMonth + '-' + chosenGregorianDateDay
      this.$emit('dateChosen', chosenGregorianDate[0] + '-' + chosenGregorianDateMonth + '-' + chosenGregorianDateDay)
    },
    monthClicked (month) {
      this.displayingMonthNum = month
      this.isMonthView = false
      this.isDayView = true
      this.goToMonth(this.displayingYear, this.displayingMonthNum)
    },
    updateInput () {
      this.chosenDate = this.chosenYear + '/' + this.chosenMonth + '/' + this.chosenDay
      let str = this.toFormatDate(this.chosenYear, this.chosenMonth, this.chosenDay)
      this.formatedChosenDate = this.convertDigitsETP(str)
      this.$emit('selected', this.chosenDate)
      this.$emit('input', this.chosenDate)
    },
    nextYearClicked () {
      if (this.displayingYear + 1 <= this.maximumYear) {
        this.displayingYear++
        this.$emit('yearChanged', this.value)
      }
    },
    preYearClicked () {
      if (this.displayingYear - 1 >= this.minimumYear) {
        this.displayingYear--
        this.$emit('yearChanged', this.value)
      }
    },
    monthNameClicked () {
      if (this.showAllMonthsNavigation) {
        this.isDayView = false
        this.isMonthView = true
        this.chosenMonth = this.displayingMonthNum + 1
        this.$emit('monthChanged', this.value)
      }
    },
    toFormatDate (year, month, day) {
      let elements = this.formatDate.split('/')
      let outYear = '' + elements[0] === 'yyyy' ? year : year - 1300
      let outMonth = ''
      if (elements[1] === 'M') outMonth = month
      else if (elements[1] === 'MM') outMonth = this.monthNames[month - 1]
      else if (elements[1] === 'MMM') outMonth = this.monthNames[month - 1]
      let outDay = elements[2] === 'dd' && day < 10 ? day : day
      return outDay + ' ' + outMonth + ' ' + outYear
    },
    /**
     * This function convert english digits to persian ones.
     * @param {String} unconverted string
     * @returns {String} converted string
     */
    convertDigitsPTE (str) {
      return this.replaceAllArray(str,
        ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
    },
    /**
     * This function convert persian digits to english ones.
     * @param {String} unconverted string
     * @returns {String} converted string
     */
    convertDigitsETP (str) {
      return this.replaceAllArray(str,
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'])
    },
    replaceAllArray (str, find, replace) {
      let replacedStr = str
      for (let i = 0; i < find.length; i++) {
        replacedStr = replacedStr.split(find[i]).join(replace[i])
      }
      return replacedStr
    },
    gregorian_to_jalali (gy, gm, gd) {
      var jalaliDate = jalali.toJalaali(gy, gm, gd)
      return [jalaliDate['jy'], jalaliDate['jm'], jalaliDate['jd']]
    },
    jalali_to_gregorian (gy, gm, gd) {
      var jalaliDate = jalali.toGregorian(gy, gm, gd)
      return [jalaliDate['gy'], jalaliDate['gm'], jalaliDate['gd']]
    },
    transformGregorianDate (date) {
      if (date) {
        var months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
        var dateSplit = date.split('-')
        var jalaliDate = this.gregorian_to_jalali(parseInt(dateSplit[0]), parseInt(dateSplit[1]), parseInt(dateSplit[2]))
        return this.convertDigitsETP(jalaliDate[2].toString()) + ' ' + months[jalaliDate[1] - 1] + ' ' + this.convertDigitsETP(jalaliDate[0].toString())
      }
    }
  }
}
</script>

<style lang='scss' scoped>
    @mixin clearfix() {
        &::after {
          display: block;
          content: "";
          clear: both;
        }
    }

    $dialog-width: 460px;
    $box-width : $dialog-width / 7;
    $month_box_width : $dialog-width / 3;

    .pdatepicker{
        position: relative;
        display: inline-block;
        * {
            box-sizing: border-box;
        }
        input{
            text-align: right;
            direction: rtl;
            padding: 0;
            border-bottom:none;
            cursor: pointer;
        }
        .dialog{
            position: absolute;
            border: 1px solid gray;
            box-shadow: 0px 0px 2px 0px gray;
            background-color: #fafafa;
            z-index: 100000;
            width: $dialog-width + 2;
            .dialog-header{
                width: 100%;
                box-shadow: 0px 0px 5px 0px gray;
                @include clearfix;
            }
            .endofweek, .endofseason{
                padding: 0px;
                margin: 0px;
                width: 0px;
                height: 0px;
                @include clearfix();
            }
            .day-view{
                text-align: right;
                .dialog-month{
                    width: 100%;
                    div{
                        display: inline-block;
                        text-align: center;
                        padding: 10px 0;
                    }
                    .nextMonth{
                        float: right;
                        width: 10%;
                        cursor: pointer;
                        &:hover{
                            background-color: rgba(200, 200, 200, 0.6);
                        }
                    }
                    .preMonth{
                        float: right;
                        width: 10%;
                        cursor: pointer;
                        &:hover{
                            background-color: rgba(200, 200, 200, 0.6);
                        }
                    }
                    .monthName{
                        float: right;
                        width: 80%;
                        &:hover{
                            background-color: rgba(200, 200, 200, 0.6);
                        }
                    }
                }
                .dialog-week{
                    width: 100%;
                }
                .day-box{
                    width: $box-width;
                    line-height: $box-width - 30;
                    display: inline-block;
                    text-align: center;
                    border: 1px solid transparent;
                    padding:0 5px;
                    cursor: pointer;
                    vertical-align: middle;
                    font-size: 14px;
                    &:hover{
                        border: 1px solid rgb(200, 200, 200);
                    }
                }
                .day-name{
                    border-bottom: 1px solid gray;
                    &:hover{
                        cursor: default;
                        border: inherit;
                        border-bottom: 1px solid gray;
                    }
                }
                .empty-box{
                    cursor: default;
                    &:hover{
                        border: inherit;
                    }
                }
            }
            .year-view{
                text-align: center;
                .dialog-year{
                    width: 100%;
                    div{
                        display: inline-block;
                        text-align: center;
                        padding: 10px 0;
                        cursor: pointer;
                    }
                    .nextYear{
                        float: right;
                        width: 10%;
                    }
                    .preYear{
                        float: right;
                        width: 10%;
                    }
                    .cyear{
                        width: 80%;
                    }
                }
                .month-box{
                    width: $month_box_width;
                    line-height: $box-width;
                    display: inline-block;
                    text-align: center;
                    border: 1px solid rgba(200, 200, 200, 0);
                    padding:0 5px;
                    cursor: pointer;
                    &:hover{
                        border: 1px solid rgb(200, 200, 200);
                    }
                }


            }
            .chosenDay, .chosenMonth{
                background-color: #73c4fa;
            }
        }
        &.inline{
            display: inline-block;
            .dialog{
                 position: static;
            }
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .slide-fade-enter-active {
        transition: all .3s ease-out;
    }
    .slide-fade-leave-active {
        transition: all .8s ease-out;
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
        transform: translateY(-10px);
        opacity: 0;
    }

    .left-slide-fade-enter-active {
        transition: all .3s ease-out;
    }
    .left-slide-fade-leave-active {
        transition: all .8s ease-out;
    }
    .left-slide-fade-enter, .left-slide-fade-leave-to
    {
        transform: translateX(-10px);
        opacity: 0;
    }
    .disabled {
        background-color: #cccccc8a;
        pointer-events: none;
    }

    .dialog-today{
        border-top: 1px solid #ccc;
        padding: 5px 0;
        padding-right: 10px
    }

    .dialog-today span {
        cursor: pointer;
    }
    
    .pointer {
        cursor: pointer;
    }
</style>

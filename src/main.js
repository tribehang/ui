import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import VueTranslate from 'vue-translate-plugin'

require('./assets/css/bootstrap.css')
require('./assets/css/bootstrap-rtl.min.css')
require('./assets/css/main.css')
require('jquery/dist/jquery.min.js')
require('bootstrap/dist/js/bootstrap.min.js')
require('./assets/css/font-awesome.min.css')
require('vue-nav-tabs/themes/vue-tabs.css')

Vue.use(vueResource)
Vue.use(VueTranslate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted () {
    this.$translate.setLang('fa')
  },
  locales: {
    fa: {
      'MONTH': 'ماه',
      'STATUS': 'وضعیت',
      'SL_created': 'در حال بررسی',
      'CREATION_YEAR': 'سال تولید',
      'SALE_CREATION_DATETIME': 'تاریخ و زمان ثبت محصول',
      'SALE_USAGE_IN_MONTHS': 'کارکرد',
      'CUSTOMER_NOTE': 'توضیحات مشتری',
      'SALE_INITIAL_PRICE': 'قیمت اولیه',
      'PRICE': 'قیمت',
      'SALE_FINAL_PRICE': 'قیمت نهایی',
      'SEMSARI_NOTE': 'توضیحات سمساری',
      'ENTER_TO_PROFILE': 'ورود به حساب کاربری',
      'PRODUCT_DETAILS_ATTRIBUTES': 'مشخصات اختصاصی محصول ',
      'BUY_PRODUCT': 'خرید محصول',
      'SIMILAR_PRODUCTS': 'محصولات مشابه',
      'TODAY': 'امروز',
      'CLOSE': 'بستن',
      'CONFIRM': 'تایید',
      'SET_APPOINTMENT': 'تایین تاریخ و زمان ملاقات',
      'SELECT_LOCATION': 'لطفا  شهر خود را انتخاب کنید',
      'CONTACT_NUMBER': 'شماره تماس',
      'POSTAL_CODE': 'کد پستی',
      'APPOINTMENT_DATE_AND_TIME': 'تاریخ و زمان ملاقات حضوری :',
      'APPOINTMENT_DETAILS': 'اطلاعات ملاقات حضوری',
      'ESTIMATED_PRICE': 'قیمت پیشنهادی :',
      'MINIMUM_PRICE': 'حداقل قیمت',
      'MAXIMUM_PRICE': 'حداکثر قیمت '
    }
  }
})

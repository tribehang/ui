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
      'SL_PRICE_ESTIMATED': 'در حال بررسی',
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
      'SET_APPOINTMENT': 'تاریخ و زمان ملاقات',
      'SELECT_LOCATION': 'لطفا  شهر خود را انتخاب کنید',
      'CONTACT_NUMBER': 'شماره تماس',
      'POSTAL_CODE': 'کد پستی',
      'APPOINTMENT_DATE_AND_TIME': 'تاریخ و زمان ملاقات حضوری :',
      'APPOINTMENT_DETAILS': 'اطلاعات ملاقات حضوری',
      'ESTIMATED_PRICE': 'قیمت پیشنهادی :',
      'MINIMUM_PRICE': 'حداقل قیمت',
      'MAXIMUM_PRICE': 'حداکثر قیمت ',
      'ADD_NEW_ADDRESS': '  افزودن آدرس جدید',
      'NEW_ADDRESS_INFORMATION': 'اطلاعات آدرس جدید',
      'STATE': 'استان',
      'CITY': 'شهر',
      'FULL_ADDRESS': 'آدرس کامل',
      'REGISTER_NEW_ADDRESS': 'ثبت آدرس جدید',
      'CANCEL': 'انصراف',
      'NAME': 'نام',
      'FAMILY_NAME': 'نام خانوادگی',
      'EMAIL_ADDRESS': 'آدرس ایمیل',
      'DATE_OF_BIRTH': 'تاریخ تولد',
      'UPDATE_PROFILE_INFORMATION': 'ویرایش اطلاعات پروفایل',
      'MY_ADDRESSES': 'آدرسهای من',
      'SELL_NEW_ITEM': 'فروش کالای جدید',
      'VIEW_SOLD_ITEMS': 'مشاهده کالای ثبت شده',
      'BACK_TO_ITEMS': 'بازگشت به کالاهای فروخته شده',
      'DELETE': 'حذف',
      '404_MESSAGE': 'صفحه مورد نظر یافت نشد !',
      '404_TITLE': 'سمساری را در صفحات اجتماعی دنبال کنید:'
    }
  }
})

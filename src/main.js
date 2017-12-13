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
require('swiper/dist/css/swiper.css')

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
      'YEAR': 'سال',
      'YES': 'بلی',
      'NO': 'خیر',
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
      'ADD_NEW_BANK_ACCOUNT': '  افزودن حساب بانکی جدید',
      'NEW_ADDRESS_INFORMATION': 'اطلاعات آدرس جدید',
      'BANK_ACCOUNT_INFORMATION': 'اطلاعات حساب بانکی ',
      'STATE': 'استان',
      'CITY': 'شهر',
      'FULL_ADDRESS': 'آدرس کامل',
      'REGISTER_NEW_ADDRESS': 'ثبت آدرس جدید',
      'REGISTER_BANK_ACCOUNT': 'ثبت حساب بانکی ',
      'CANCEL': 'انصراف',
      'NAME': 'نام',
      'FAMILY_NAME': 'نام خانوادگی',
      'EMAIL_ADDRESS': 'آدرس ایمیل',
      'DATE_OF_BIRTH': 'تاریخ تولد',
      'UPDATE_PROFILE_INFORMATION': 'ویرایش اطلاعات پروفایل',
      'MY_ADDRESSES': 'آدرسهای من',
      'MY_BANK_ACCOUNT': 'اطلاعات حساب بانکی',
      'SELL_NEW_ITEM': 'فروش کالای جدید',
      'VIEW_SOLD_ITEMS': 'مشاهده کالای ثبت شده',
      'BACK_TO_ITEMS': 'بازگشت به کالاهای فروخته شده',
      'DELETE': 'حذف',
      '404_MESSAGE': 'صفحه مورد نظر یافت نشد !',
      '404_TITLE': 'سمساری را در صفحات اجتماعی دنبال کنید:',
      'HOME': 'خانه',
      'COMPANY_SLOGAN': 'آسان بفروش، مطمئن بخر.',
      'HOME_WELCOME_NOTE': 'عزیز, خوش آمدید',
      'SELL': 'فروش',
      'BUY': 'خرید',
      'CONTACT_US': 'تماس با ما',
      'ABOUT_US': 'درباره ما',
      'NEWSLETTER': 'خبرنامه',
      'INSERT_YOUR_EMAIL_ADDRESS': 'آدرس ایمیل خود را وارد کنید',
      'INSERT_EMAIL_OR_USERNAME': 'نام کاربری یا ایمیل',
      'SEND': 'ارسال',
      'FOOTER_HOW_CAN_I_HELP_YOU': 'چطور میتونیم کمکتون کنیم ؟',
      'FOOTER_CONTACT_MESSAGE': '۸۸۸۸۸۸۸۸ (۰۲۱) info[at]semsari.net',
      'FOOTER_24_SUPPORT': 'پشتیبانی ۲۴ ساعته',
      'FOOTER_FOLLOW_US': 'ما را دنبال کنید',
      'HOME_I_WANT_TO_SELL': 'میخوام بفروشم',
      'HOME_I_WANT_TO_BUY': 'میخوام بخرم',
      'REGISTER': 'ثبت نام',
      'LOGIN': 'ورود',
      'HOME_BANNER_MESSAGE': 'به راحتی و در کمترین زمان\n' +
      '                          کالای مورد نظر خود را\n' +
      '                          بفروشید.\n' +
      '                          ما آن را برای شما گارانتی\n' +
      '                          خواهیم کرد.',
      'SELL_ITEM': 'ثبت کالا',
      'PASSWORD': 'رمز عبور',
      'FORGOT_PASSWORD_MESSAGE': 'رمز عبور خود را فراموش کرده ام',
      'PASSWORD_REPEAT': 'تکرار رمز عبور',
      'LATEST_PRODUCTS': 'آخرین محصولات',
      'CONTROL_PANEL': 'کنترل پنل',
      'UPDATE_PROFILE': 'ویرایش اطلاعات پروفایل',
      'NEXT_STEP': 'مرحله بعد',
      'PREVIOUS_STEP': 'مرحله قبل',
      'MAIN_INFORMATION': 'اطلاعات اصلی',
      'CATEGORY': 'دسته',
      'SUB_CATEGORY': 'زیرمجموعه',
      'CREATE_YEAR': 'سال تولید',
      'CURRENT_CONDITION': 'وضعیت کنونی',
      'FURTHER_INFORMATION': 'اطلاعات تکمیلی',
      'PRODUCT_IMAGES': 'عکس های محصول',
      'SUBMIT': 'تائید',
      'PLEASE_CHOOSE_CATEGORY': 'لطفا دسته بندی کالای خود  را انتخاب کنید',
      'PLEASE_CHOOSE_SUB_CATEGORY': 'لطفا زیرمجموعه کالای  خود را انتخاب کنید',
      'PLEASE_CHOOSE_CREATE_YEAR': 'لطفا سال تولید کالای خود را انتخاب کنید',
      'PLEASE_CHOOSE_CONDITION': 'لطفا وضعیت کنونی کالای خود را انتخاب کنید',
      'PLEASE_CHOOSE_USAGE': 'لطفا میزان کاردکرد کالای خود را تعیین کنید',
      'APPOINTMENT_NO_ADDRESS_ERROR_MESSAGE': 'هیچ آدرسی برای شما ثبت نشده است. لطفا آدرس جدید خود را ثبت کنید.',
      'APPOINTMENT_NO_BANK_ACCOUNT_ERROR_MESSAGE': 'هیچ حساب بانکی برای شما ثبت نشده است. لطفا اطلاعات حساب بانکی خود را وارد کنید',
      'FULL_NAME': 'نام و نام خانوادگی',
      'BANK_NAME': 'نام بانک',
      'BANK_ACCOUNT_NUMBER': 'شماره حساب',
      'BANK_ACCOUNT_CARD_NUMBER': 'شماره کارت',
      'BANK_ACCOUNT_SHABA': 'شماره شبا',
      'DELETE_BANK_ACCOUNT': 'حذف اطلاعات بانکی',
      'CHOOSE_YOUR_ADDRESS': 'لطفا یک آدرس را انتخاب کنبد.',
      'CHOOSE_YOUR_BANK_ACCOUNT': 'لطفا حساب بانکی را انتخاب کنبد.',
      'SALE_TERMS_CONDITION': ' ضمن پذیرش قوانین و مقررات وب‌سایت، تایید می نمایم که حداقل قیمت داده شده در صورت نهایی شدن را پذیرفته ام',
      'MORE_INFORMATION': 'توضیحات بیشتر'
    }
  }
})

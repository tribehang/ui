import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import VueTranslate from 'vue-translate-plugin'
import VeeValidate from 'vee-validate'

require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap/dist/js/bootstrap.min')
require('superfish/src/css/superfish.css')
require('superfish/dist/js/hoverIntent.js')
require('superfish/src/js/superfish.js')
require('./assets/css/main-style.css')
require('./assets/css/style.css')

Vue.use(vueResource)
Vue.use(VueTranslate)
Vue.use(VeeValidate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted () {
    this.$translate.setLang('en')
  },
  locales: {
    en: {
      'FULL_NAME': 'Full Name'
    }
  }
})

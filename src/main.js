import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import VueTranslate from 'vue-translate-plugin'

require('bootstrap/dist/css/bootstrap.min.css')
require('bootstrap/dist/js/bootstrap.min')

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
    this.$translate.setLang('en')
  },
  locales: {
    en: {
      'MONTH': 'Month'
    }
  }
})

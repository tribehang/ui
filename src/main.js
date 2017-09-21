import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'

require('./assets/css/bootstrap.css')
require('./assets/css/bootstrap-rtl.min.css')
require('./assets/css/main.css')
require('jquery/dist/jquery.min.js')
require('bootstrap/dist/js/bootstrap.min.js')
require('./assets/css/font-awesome.min.css')
require('vue-nav-tabs/themes/vue-tabs.css')

Vue.use(vueResource)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

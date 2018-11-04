import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'


import BootstrapVue from 'bootstrap-vue'

import globals from './globals'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuelidate)

// Global RTL flag
Vue.mixin({
  data: globals
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

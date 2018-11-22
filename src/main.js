import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import globals from './globals'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(Notifications, { velocity })


const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    userLoggedIn: null,
    dataUrl: 'http://localhost:1010'
  },
  mutations: {
    update_isLoggedIn (state, newValue) { state.isLoggedIn = newValue; },
    update_userLoggedIn (state, newValue) { state.userLoggedIn = newValue; }
  }
});


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.state.isLoggedIn){
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})




// Global RTL flag
Vue.mixin({
  data: globals
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

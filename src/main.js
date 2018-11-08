import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import globals from './globals'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueResource)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    userLoggedIn: null
  },
  mutations: {
    update_isLoggedIn (state, newValue) { state.isLoggedIn = newValue; },
    update_userLoggedIn (state, newValue) { state.userLoggedIn = newValue; }
  }
});


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    // if(store.state.isLoggedIn){
    if(true){
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

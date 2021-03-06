// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './vuex/'

Vue.config.productionTip = false
console.log(router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
// a
// .$mount('#app') === el:'#app',
// template: '<App/>',
// components: { App }

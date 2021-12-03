import Vue from 'vue'
import App from './App.vue'
import router from './routes/index.js';
import jQuery from 'jquery'
import GAuth from 'vue-google-oauth2'
import GSignInButton from 'vue-google-signin-button-directive'
import store from '../src/services/users/store'

//fort-awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(GAuth, {clientId: '516796777908-c0iquqolepstq9ft7ucu23rprqs5qf2e.apps.googleusercontent.com'})
Vue.use(GSignInButton)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

global.$ = jQuery
// window.Kakao.init('3cc9c089f9a7a30a40def2b05ea954c8');

import Vue from 'vue'
import { store } from './store/store.js'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
// Import  Globally
import SnckBar from './components/shared/SnackBar.vue'
import Loading from './components/shared/Loading.vue'
import AlertCmp from './components/shared/Alert.vue'
import VueQuillEditor from 'vue-quill-editor'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor /*, /* { default global options } */)

Vue.component('app-snackbar',SnckBar)
Vue.component('app-alert',AlertCmp)
Vue.component('app-loading',Loading)

Vue.config.productionTip = true
Vue.prototype.$hostname =
  (Vue.config.productionTip) ? 'https://api-help.herokuapp.com' : 'http://192.168.43.49:8000'

Vue.use(VueRouter)
Vue.use(Vuetify)

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken2,
    accent: colors.red.accent2,
    secondary: colors.grey.lighten1,
    info: colors.blue.lighten1,
    warning: colors.amber.darken2,
    error: colors.red.accent4,
    success: colors.green.lighten2
  }
})
Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyDyJUwEpWPLTDZrX9TVeq5m8vGQScqyZCA'
})

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});



new Vue({
  store,
  el: '#app',
  render: h => h(App),
  router: router
})

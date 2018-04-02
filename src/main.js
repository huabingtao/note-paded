import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import MintUI from 'mint-ui'
import store from './store'
import 'mint-ui/lib/style.css'

Vue.use(Cube)
Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

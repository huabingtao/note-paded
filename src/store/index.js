import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import  mutations from './mutations'
// import state from './state'
import * as func from '../common/js/local';
Vue.use(Vuex)

const state = func.local.get() || {
    event: [],
    count: 0
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})

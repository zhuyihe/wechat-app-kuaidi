import Vue from 'vue'
import Vuex from 'vuex'
import {state} from './state'
import {mutations} from './mutations'
import {actions} from './actions'
 import {setStorageSync} from '@/assets/js/common'
Vue.use(Vuex)
const store = new Vuex.Store({
    state,
    mutations,
    actions
})
setStorageSync('state',store.state)
export default store
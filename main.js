import Vue from 'vue'
import App from './App'
//使用vuex
import store from './store/store'
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
import {dateFtt} from '@/assets/js/common'
import uniIcon from './components/uni-icon/uni-icon.vue'
Vue.component('uni-icon',uniIcon)
Vue.prototype.dateFtt=dateFtt
const app = new Vue({
    store,...App
})
app.$mount()

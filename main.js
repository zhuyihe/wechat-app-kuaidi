import Vue from 'vue'
import App from './App'
//使用vuex
Vue.config.productionTip = false
App.mpType = 'app'
import {dateFtt} from '@/assets/js/common'
import uniIcon from './components/uni-icon/uni-icon.vue'
Vue.component('uni-icon',uniIcon)
Vue.prototype.dateFtt=dateFtt
const app = new Vue({
    ...App
})
app.$mount()

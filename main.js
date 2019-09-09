import Vue from 'vue'
import App from './App'
//使用vuex
import store from './store/store'
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'
import uniIcon from './components/uni-icon/uni-icon.vue'
Vue.component('uni-icon',uniIcon)
const app = new Vue({
    store,...App
})
app.$mount()

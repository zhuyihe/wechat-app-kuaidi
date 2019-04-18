import Vue from 'vue'
import App from './App'
//使用vuex
import store from './store/store'
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'
// import cuCustom from './colorui/components/cu-custom.vue'
// Vue.component('cu-custom',cuCustom)
const app = new Vue({
    store,...App
})
app.$mount()

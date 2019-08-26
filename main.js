import Vue from 'vue'
import App from './App'
//使用vuex
import store from './store/store'
Vue.prototype.$store = store
import sunUiBasic from './components/sunui-upimg/sunui-upimg-basic.vue'
import sunUiOos from './components/sunui-upimg/sunui-upimg-alioos.vue'
// import sunUiqiNiu from './components/sunui-upimg/sunui-upimg-qiniu.vue'
import sunUiCos from './components/sunui-upimg/sunui-upimg-tencent.vue'
Vue.component('sunui-upbasic',sunUiBasic)
Vue.component('sunui-upoos',sunUiOos)
// Vue.component('sunui-upqiniu',sunUiqiNiu)
Vue.component('sunui-upcos',sunUiCos)
Vue.config.productionTip = false

App.mpType = 'app'
// import cuCustom from './colorui/components/cu-custom.vue'
// Vue.component('cu-custom',cuCustom)
const app = new Vue({
    store,...App
})
app.$mount()

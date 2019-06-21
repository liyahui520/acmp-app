import Vue from 'vue'
import App from './App'
import util from './pages/common/js/util.js'
Vue.config.productionTip = false
Vue.prototype.util = util
App.mpType = 'app'
const app = new Vue({
    ...App
})
Vue.use(util)
app.$mount()

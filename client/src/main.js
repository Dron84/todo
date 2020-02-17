import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import {store} from './store/store'
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$isEmpty = (object) => {
    // console.log('object',object,'typeof', typeof object)
    if (object === null || object === undefined) {
        return true
    } else {
        if (Object.entries(object).length === 0) {
            return true
        } else {
            return false
        }
    }
}
Vue.prototype.$api_url = 'http://localhost:3000'

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')

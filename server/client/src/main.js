import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import {store} from './store/store' //подключаем стор

Vue.use(Vuex) //Заставляем использовать vuex
Vue.config.productionTip = false
Vue.prototype.$isEmpty = (object) => {
    // Проверяем обект пустой ли он
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

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.png')
})

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(toast)

Vue.prototype.$bus = new Vue(); // vue2.0 事件总线

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

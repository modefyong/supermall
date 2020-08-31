import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.prototype.$bus = new Vue(); // vue2.0 事件总线

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

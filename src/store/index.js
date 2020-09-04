import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex);


const state = {
    cartList: [],// 购物车商品信息
}

// 2.创建store对象
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})

// 3.挂载到vue实例上
export default store
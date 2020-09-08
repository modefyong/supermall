import { ADD_COUNTER, ADD_NEW_CART } from './mutations-type'
export default {
    // mutations的目的是修改state中的值
    // mutations中做的事情要尽可能单一。
    [ADD_COUNTER](state, payload) { // 增加商品数量
        payload.count++;
    },
    [ADD_NEW_CART](state, payload) { // 添加新商品
        payload.checked = true;// 往对象模型中添加选中属性
        state.cartList.push(payload);
    },
    changeSelectAll(state, arr) {
        state.cartList = arr;
    }

}
import { ADD_COUNTER, ADD_NEW_CART } from './mutations-type'
export default {
    addCart(context, payload) { // 加入到购物车
        const oldProduct = context.state.cartList.find(item => item.iid === payload.iid); // 找不到则返回undefined，找到返回对应对象

        if (oldProduct) {
            context.commit(ADD_COUNTER, oldProduct);
        } else {
            payload.count = 1;
            context.commit(ADD_NEW_CART, payload);
        }

    }
}
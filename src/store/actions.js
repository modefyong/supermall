import { ADD_COUNTER, ADD_NEW_CART } from './mutations-type'
export default {
    addCart(context, payload) { // 加入到购物车
        return new Promise((resolve, reject) => {
            const oldProduct = context.state.cartList.find(item => item.iid === payload.iid); // 找不到则返回undefined，找到返回对应对象

            if (oldProduct) {
                context.commit(ADD_COUNTER, oldProduct);
                resolve("又添加了该商品！");
            } else {
                payload.count = 1;
                context.commit(ADD_NEW_CART, payload);
                resolve("添加了新商品！");
            }
        })

    }
}
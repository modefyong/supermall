import { request } from './request.js'


// function getDetailInfo(iid) {
//     return request({
//         url: '/detail',
//         params: {
//             iid
//         }
//     })
// }

// 为什么要用小括号包裹起来？
const getDetailInfo = ((iid) => {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
})

class Goods {
    constructor(itemInfo, columns, services) {
        this.clothDesc = itemInfo.title;
        this.price = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discountDesc = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;


    }
}

export { getDetailInfo, Goods }
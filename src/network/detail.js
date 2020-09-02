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

function getRecommendsInfo() {
    return request({
        url: '/recommend'
    })
}

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

class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

export { getDetailInfo, Goods, Shop, getRecommendsInfo }
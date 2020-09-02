<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll
      class="detail-scroll"
      ref="bscroll"
    >
      <detail-swiper :top-imgs="topImgs"></detail-swiper>
      <detail-cloth-info :goods="goods"></detail-cloth-info>
      <detail-shop-info :shop-info="shops"></detail-shop-info>
      <detail-goods-info
        :detail-info="detail"
        @imgLoad="imgLoad"
      ></detail-goods-info>
      <detail-params :item-params="params"></detail-params>
      <detail-evaluate></detail-evaluate>
      <good-list :goodsList="recommends"></good-list>
    </scroll>

  </div>
</template>

<script>
import DetailNavBar from './detailChild/DetailNavBar'
import DetailSwiper from './detailChild/DetailSwiper'
import DetailClothInfo from './detailChild/DetailClothInfo'
import DetailShopInfo from './detailChild/DetailShopInfo'
import DetailGoodsInfo from './detailChild/DetailGoodsInfo'
import DetailParams from './detailChild/DetailParams'
import DetailEvaluate from './detailChild/DetailEvaluate'

import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'


import { getDetailInfo, Goods, Shop, getRecommendsInfo } from 'network/detail.js'
import { itemListenerMixin } from 'common/mixin.js'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailClothInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailEvaluate,
    Scroll,
    GoodList,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: '',
      topImgs: [], // 轮播图
      goods: {}, // 商品信息
      shops: {}, // 店铺信息
      detail: {}, // 详情信息
      params: {}, // 参数信息
      recommends: [], // 推荐信息
    };
  },
  methods: {
    imgLoad() {
      // console.log("刷新");
      this.$refs.bscroll.refresh();
    }
  },
  created() { // keep-alive 激活时
    this.iid = this.$route.params.iid;
    // 获取商品详情信息
    getDetailInfo(this.iid).then(res => {
      // console.log("详情页数据", res);
      const data = res.data.result;
      this.topImgs = data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      this.shops = new Shop(data.shopInfo);
      this.detail = data.detailInfo;
      this.params = data.itemParams;
    })
    // 获取商品推荐信息
    getRecommendsInfo().then(res => {
      console.log("推荐数据", res.data);
      this.recommends = res.data.data.list;
    })
  },
  destroyed() {
    this.$bus.$off('imgLoad', this.itemListener);
  }
}
</script>

<style scoped>
/* 详情页覆盖底部tab栏 */
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.detail-scroll {
  height: calc(100% - 44px);
}
</style>
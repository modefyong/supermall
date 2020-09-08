<template>
  <div id="detail">
    <detail-nav-bar
      @itemClick="itemClick"
      class="detail-nav"
      ref="nav"
    />
    <scroll
      class="detail-scroll"
      ref="bscroll"
      :probe-type="3"
      @probePos="contentScroll"
    >
      <detail-swiper :top-imgs="topImgs"></detail-swiper>
      <detail-cloth-info :goods="goods"></detail-cloth-info>
      <detail-shop-info :shop-info="shops"></detail-shop-info>
      <detail-goods-info
        :detail-info="detail"
        @imgLoad="imgLoad"
      ></detail-goods-info>
      <detail-params
        ref="params"
        :item-params="params"
      ></detail-params>
      <detail-evaluate ref="evaluate"></detail-evaluate>
      <good-list
        ref="goods"
        :goodsList="recommends"
      ></good-list>
    </scroll>
    <detail-bottom @addToCart="addToCart"></detail-bottom>
    <back-top
      @click.native="backTopClick"
      v-show="isShowBackTop"
    />
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
import DetailBottom from './detailChild/DetailBottom'

import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'

import { getDetailInfo, Goods, Shop, getRecommendsInfo } from 'network/detail.js'
import { itemListenerMixin, backTopMixin } from 'common/mixin.js'
import { debounce } from 'common/utils.js'

import { mapActions } from 'vuex'

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
    DetailBottom,
    Scroll,
    GoodList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: '',
      topImgs: [], // 轮播图
      goods: {}, // 商品信息
      shops: {}, // 店铺信息
      detail: {}, // 详情信息
      params: {}, // 参数信息
      recommends: [], // 推荐信息
      topTitleYList: [], // 顶部导航栏对应内容y值
      getThemeTopY: null,// 保存防抖函数
      currentIndex: 0, // 保存索引
    };
  },
  methods: {
    ...mapActions(["addCart"]),
    addToCart() { // 加入购物车
      const productObj = {};
      productObj.iid = this.iid;
      productObj.image = this.topImgs[0];
      productObj.title = this.goods.title;
      productObj.desc = this.goods.clothDesc;
      productObj.price = this.goods.lowNowPrice;

      // console.log("购物车商品对象信息", productObj);
      // this.$store.dispatch("addCart", productObj).then(data => {
      //   console.log("获得弹出信息", data);
      // })
      if (!productObj.iid) return
      this.addCart(productObj).then(data => {
        this.$toast.show(data, 1000);
      })

    },
    imgLoad() {
      this.$refs.bscroll.refresh();
      this.getThemeTopY();
    },
    itemClick(index) {
      this.$refs.bscroll.scrollTo(0, -this.topTitleYList[index], 100);
    },
    contentScroll(position) { // 监听详情页内容的滚动
      const positionY = (-position.y);
      this.listenBacktop(positionY); // 使用混入的回到顶部
      let len = this.topTitleYList.length
      for (let i = 0; i < len; i++) {
        if ((this.currentIndex !== i) && ((i < len - 1 && positionY >= this.topTitleYList[i] && positionY < this.topTitleYList[i + 1]) || (i === len - 1 && positionY >= this.topTitleYList[i]))) {
          // console.log("滚动内容的索引", i);
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    }
  },
  created() { // keep-alive 激活时
    this.iid = this.$route.params.iid;
    // 获取商品详情信息
    getDetailInfo(this.iid).then(res => {
      console.log("详情页数据", res);
      const data = res.data.result;
      this.topImgs = data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      this.shops = new Shop(data.shopInfo);
      this.detail = data.detailInfo;
      this.params = data.itemParams;
    })
    // 获取商品推荐信息
    getRecommendsInfo().then(res => {
      this.recommends = res.data.data.list;
    })
    this.getThemeTopY = () => {
      this.topTitleYList = [];

      this.topTitleYList.push(0);
      // -44是减去导航栏的高度
      this.topTitleYList.push(this.$refs.params.$el.offsetTop - 44);
      this.topTitleYList.push(this.$refs.evaluate.$el.offsetTop - 44);
      this.topTitleYList.push(this.$refs.goods.$el.offsetTop - 44);
    };
  },
  mounted() {
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
  height: calc(100% - 44px - 49px);
}
</style>
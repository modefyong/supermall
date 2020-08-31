<template>
  <div>
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImgs="topImgs"></detail-swiper>
    <detail-cloth-info :goods="goods"></detail-cloth-info>
  </div>
</template>

<script>
import DetailNavBar from './detailChild/DetailNavBar'
import DetailSwiper from './detailChild/DetailSwiper'
import DetailClothInfo from './detailChild/DetailClothInfo'

import { getDetailInfo, Goods } from 'network/detail.js'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailClothInfo,
  },
  data() {
    return {
      iid: '',
      topImgs: [], // 轮播图
      goods: {}, // 整合商品信息对象
    };
  },
  methods: {

  },
  created() { // keep-alive 激活时
    this.iid = this.$route.params.iid;
    getDetailInfo(this.iid).then(res => {
      console.log("详情页数据", res);
      const data = res.data.result;
      this.topImgs = data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
    })
  }
}
</script>

<style>
</style>
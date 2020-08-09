<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="home-scroll" 
      ref="bscroll" 
      :probe-type="3" 
      @probePos="probePos"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <Feature />
      <tab-control
        class="tab-fix"
        :tabList="['流行','新款', '推荐']"
        @recordIndex="recordIndex"
      ></tab-control>
      <good-list :goodsList="showList"></good-list>
    </scroll>
  <back-top @click.native="backTopClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar';
import HomeSwiper from './childPos/HomeSwiper';
import RecommendView from './childPos/RecommendView';
import Feature from './childPos/Feature';
import TabControl from 'components/content/tab-control/TabControl';
import GoodList from 'components/content/goods/GoodList';
import GoodListItem from 'components/content/goods/GoodListItem';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop';

import { getHomeMultiData, getHomeCommodityData } from 'network/home';

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature,
    TabControl,
    GoodList,
    GoodListItem,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      type: ['pop', 'new', 'sell'],
      tIndex: 0,
      isShowBackTop: false, // 是否显示回到顶部组件
      goods: {
        'pop': { page: 1, list: [] },
        'new': { page: 1, list: [] },
        'sell': { page: 1, list: [] }
      }
    };
  },
  computed: {
    showList(){
      return this.goods[this.type[this.tIndex]].list;
    }
  },
  methods: {
    pullingUp(){ // 监听上拉加载更多
      this.getHomeCommodityData(this.type[this.tIndex]);
    },
    probePos(position){ // 监听滚动位置
      this.isShowBackTop = (-position.y) > 1000;
    },
    backTopClick(){ // 点击回到顶部
      this.$refs.bscroll.scrollTo(0, 0, 1000);
    },
    recordIndex(index){ // 记录选项卡索引
      this.tIndex = index;
    },
    // 获取轮播图和推荐图片
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeCommodityData(type) {
      // 获取首页商品数据
      const page = this.goods[type].page + 1;
      getHomeCommodityData(type, page).then(res => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        // 上拉加载更多完毕
        this.$refs.bscroll.finishPullUp();
      });
    }
  },
  created() {
    this.getHomeMultiData();
    this.getHomeCommodityData('pop');
    this.getHomeCommodityData('new');
    this.getHomeCommodityData('sell');
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* 视口高度 */
  height: 100vh; 
  position: relative;
}
/* 不能在组件内部设置位置固定的样式，原因？容易和flex布局混乱。 */
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 左右上都为0，就显示在顶部了 */
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999;
}
/* 选项卡吸顶效果 */
.tab-fix {
  position: sticky;
  top: 44px;
  background-color: #fff;
}

/* .home-scroll {
  height: calc(100% - 93px); 
  overflow: hidden;
} */
.home-scroll {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
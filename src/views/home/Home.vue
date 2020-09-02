<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      v-show="isFixed"
      class="out-tab"
      ref="tabControl1"
      :tabList="['流行','新款', '精选']"
      @recordIndex="recordIndex"
    ></tab-control>
    <scroll
      class="home-scroll"
      ref="bscroll"
      :probe-type="3"
      @probePos="probePos"
      @pullingUp="pullingUp"
    >
      <home-swiper
        :banners="banners"
        @swiperLoad="swiperLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <Feature />
      <tab-control
        ref="tabControl"
        :tabList="['流行','新款', '精选']"
        @recordIndex="recordIndex"
      ></tab-control>
      <good-list :goodsList="showList"></good-list>
    </scroll>
    <back-top
      @click.native="backTopClick"
      v-show="isShowBackTop"
    />
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
import { itemListenerMixin } from 'common/mixin.js'
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
  mixins: [itemListenerMixin],
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
      },
      tabOffsetTop: 0, // tab高度
      isFixed: false, // 控制tab栏固定
      saveY: 0, // 记录离开时的位置
    };
  },
  computed: {
    showList() {
      return this.goods[this.type[this.tIndex]].list;
    }
  },
  methods: {
    swiperLoad() { // 监听图片加载事件 
      // console.log(this.$refs.tabControl.$el.offsetTop, "tab选项卡高度");
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    debounce(func, delay) { // 防抖函数
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args); // 为什么使用apply函数？改变this指向？this没变啊。。。
        }, delay);
      }
    },
    pullingUp() { // 监听上拉加载更多
      this.getHomeCommodityData(this.type[this.tIndex]);
    },
    probePos(position) { // 监听滚动位置
      this.isShowBackTop = (-position.y) > 1000;

      // console.log((-position.y), "滚动时的tab高度");
      // console.log(this.tabOffsetTop, "滚动时的tab高度");
      this.isFixed = (-position.y) >= this.tabOffsetTop;
    },
    backTopClick() { // 点击回到顶部
      this.$refs.bscroll.scrollTo(0, 0, 1000);
    },
    recordIndex(index) { // 记录选项卡索引
      this.tIndex = index;

      // 保持两个tab栏同步
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
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

    // 在创建阶段，拿不到this.$refs，页面上挂载的DOM元素。
  },
  mounted() {
    // 第一个参数是函数，不是函数执行
    // const refresh = this.debounce(this.$refs.bscroll.refresh, 300);
    // // 监听首页图片加载完成
    // this.$bus.$on("imgLoad", () => {
    //   refresh();
    // })
  },
  activated() { // 设置保存滚动的y值
    // 手动刷新一下bscroll，否则会出现返回顶部的bug。
    this.$refs.bscroll.refresh();
    this.$refs.bscroll.scrollTo(0, this.saveY, 0);

  },
  deactivated() { // 保存滚动的y值
    this.saveY = this.$refs.bscroll.getScrollY();
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
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999; */
}
/* 选项卡吸顶效果，使用滚动后不起作用了 */
/* .tab-fix {
  position: sticky;
  top: 44px;
  background-color: #fff;
} */

/* .home-scroll {
  height: calc(100% - 93px); 
  overflow: hidden;
} */
.home-scroll {
  /* 啥意思，顶部固定？ */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.out-tab {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
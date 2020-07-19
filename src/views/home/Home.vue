<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <Feature :value="value" />
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/NavBar";
import HomeSwiper from "./childPos/HomeSwiper";
import RecommendView from "./childPos/RecommendView";
import Feature from "./childPos/Feature";

import { getHomeMultiData } from "network/home";

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    Feature
  },
  data() {
    return {
      banners: [],
      recommends: [],
      value: ""
    };
  },
  methods: {},
  created() {
    getHomeMultiData().then(res => {
      this.banners = res.data.data.banner.list;
      this.recommends = res.data.data.recommend.list;
    });
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
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
</style>
<template>
  <div class="tab-bar">
    <tab-bar-item path="/home" activeColor>
      <img slot="tab-icon" src="~assets/img/tabbar/ic_tabbar_home_select.svg" alt srcset />
      <img slot="tab-icon-active" src="~assets/img/tabbar/ic_tabbar_home_select (1).svg" />
      <div slot="tab-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="tab-icon" src="~assets/img/tabbar/03TABbar.svg" alt srcset />
      <img slot="tab-icon-active" src="~assets/img/tabbar/03TABbar (1).svg" alt srcset />
      <div slot="tab-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/order">
      <img slot="tab-icon" src="~assets/img/tabbar/04TABbar.svg" alt srcset />
      <img slot="tab-icon-active" src="~assets/img/tabbar/04TABbar (1).svg" alt srcset />
      <div slot="tab-text">订单</div>
    </tab-bar-item>
    <tab-bar-item path="/user">
      <img slot="tab-icon" src="~assets/img/tabbar/05TABbar-fill.svg" alt srcset />
      <img slot="tab-icon-active" src="~assets/img/tabbar/05TABbar-fill (1).svg" alt srcset />
      <div slot="tab-text">我的</div>
    </tab-bar-item>
  </div>
</template>

<script>
import TabBarItem from "../common/TabBarItem";
export default {
  components: {
    TabBarItem
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
/* 必须加分号 
为什么引入css会报错？没有加载器？在app.vue中怎么可以引入呢？
*/
@import "~assets/css/base.css";

.tab-bar {
  display: flex;
  background-color: #f6f6f6;

  /* 固定到底部 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
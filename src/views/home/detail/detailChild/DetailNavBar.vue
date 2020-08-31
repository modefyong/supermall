<template>
  <nav-bar>
    <div
      slot="left"
      class="left-arrow"
      @click="goBack"
    >
      <img
        src="~assets/img/common/back.svg"
        alt="往左箭头"
      >
    </div>
    <div
      slot="center"
      class="nav-center"
    >
      <span
        :class="{red: index == currentIndex }"
        v-for="(item, index) in navTitle"
        :key="index"
        @click="itemClickColor(index)"
      > {{ item }} </span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/NavBar.vue'
export default {
  components: {
    NavBar
  },
  data() {
    return {
      navTitle: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
    };
  },
  methods: {
    itemClickColor(index) { // 选中高亮
      this.currentIndex = index;
    },
    goBack() { // 返回上一页。两种方式
      // this.$router.back();
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.nav-center {
  display: flex;
}
.nav-center span {
  flex: 1;
}
.left-arrow {
  display: flex;
  justify-content: center;
  height: 100%;
}

.red {
  color: var(--color-high-text);
}
</style>
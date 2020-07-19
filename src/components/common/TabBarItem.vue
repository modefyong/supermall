<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="tab-icon"></slot>
    </div>
    <div v-else>
      <slot name="tab-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="tab-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "blue"
    }
  },
  data() {
    return {
      // isActive: false
    };
  },
  computed: {
    isActive() {
      // 判断当前活跃的路由是否包含传入的路由
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path);
    }
  }
};
</script>

<style scoped>
@import "~assets/css/base.css";
.tabbar-item {
  flex: 1;
  height: 49px;
  /* line-height: 49px; */
  text-align: center;
  font-size: 14px;
  margin-top: 2px;
}
.tabbar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
</style>
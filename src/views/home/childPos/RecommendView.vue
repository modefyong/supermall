<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, i) in recommends" :key="i">
      <a :href="item.link">
        <img class="re-img" :src="item.image" alt="推荐图片" :title="item.title" />
        <div class="text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  padding: 20px 0;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
  text-align: center;
}
.re-img {
  width: 86px;
}
</style>
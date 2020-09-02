<template>
  <div
    v-if="Object.keys(shopInfo).length != 0"
    class="shop-info"
  >
    <div class="top-title">
      <img
        :src="shopInfo.logo"
        alt="logo"
      >
      <span class="top-name"> {{ shopInfo.name }} </span>
    </div>

    <div class="content">
      <div class="count">
        <div>
          <p>5.8万</p>
          <p>总销量</p>
        </div>
        <div class="right-line">
          <p>99</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="evaluate">
        <p
          v-for="(i, index) in shopInfo.score"
          :key="index"
        >
          <span style="width:80px;"> {{ i.name }} </span>
          <span
            style="width:50px;"
            :class="i.isBetter?'red':'green'"
          > {{ i.score }} </span>
          <span :class="i.isBetter?'red-bgc':'green-bgc'"> {{ i.isBetter ? "高" : "低" }} </span>
        </p>
      </div>
    </div>

    <div class="enter">
      <span class="enter-content">进店逛逛</span>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {

    };
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.shop-info {
  border-bottom: 2px solid #ccc;
  padding-bottom: 40px;
}
.top-title {
  margin: 20px 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  span {
    margin-left: 12px;
  }
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  .count {
    flex: 1;
    display: flex;
    text-align: center;
    div {
      flex: 1;
    }
    .right-line {
      border-right: 2px solid #ccc;
      padding-right: 5px;
    }
  }
  .evaluate {
    flex: 1;
    margin-left: 30px;
    p {
      display: flex;
      line-height: 24px;
      margin: 5px 0;
    }
  }
}

.red {
  color: var(--color-high-text);
}
.green {
  color: #9acd32;
}
.red-bgc {
  color: #fff;
  background-color: var(--color-high-text);
}
.green-bgc {
  color: #fff;
  background-color: #9acd32;
}
.enter {
  margin-top: 10px;
  text-align: center;
  .enter-content {
    padding: 5px 38px;
    color: #666;
    background-color: #ccc;
    border-radius: 10px;
  }
}
</style>
<template>
  <div id="bottom-tabbar">
    <div
      class="add-cart"
      @click="addToCart"
    >
      加入购物车
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {

    };
  },
  methods: {
    addToCart() {
      this.$emit("addToCart");
    }
  }
}
</script>

<style scoped>
#bottom-tabbar {
  width: 100%;
  position: fixed;
}
#bottom-tabbar .add-cart {
  height: 49px;
  line-height: 49px;
  color: #fff;
  background-color: #7aa9d9;
  text-align: center;
}
</style>
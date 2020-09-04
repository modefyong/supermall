<template>
  <div id="cart">
    <cart-nav />
    <!-- <scroll class="cart-scroll"> -->
    <cart-shop :cartShop="cartShop"></cart-shop>
    <!-- </scroll> -->

  </div>
</template>

<script>
import CartNav from "./childCompos/CartNav"
import CartShop from "./childCompos/CartShop"

import Scroll from 'components/common/scroll/Scroll'
export default {
  components: {
    CartNav,
    CartShop,
    Scroll,
  },
  computed: {
    cartShop() {
      return this.$store.state.cartList;
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
#cart {
  height: 100vh;
  position: relative;
}
/* .cart-scroll {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 93px;
  left: 0;
  right: 0;
} */
</style>

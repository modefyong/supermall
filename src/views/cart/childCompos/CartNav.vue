<template>
  <div class="cart-nav">
    <nav-bar>
      <div slot="center">
        购物车 <span v-if="cartCount !== 0"> （{{ cartCount }}） </span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar'
import { mapGetters } from 'vuex'
export default {
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['cartCount'])
  },
  data() {
    return {

    };
  },
  methods: {

  }
}
</script>

<style scoped>
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
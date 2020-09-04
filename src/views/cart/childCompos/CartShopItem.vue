<template>
  <div class="shop-item">
    <div class="check-box">
      <input
        type="checkbox"
        name=""
        id=""
        :checked="isChecked"
        ref="itemChecked"
        @click="itemClick"
      >
    </div>
    <div class="cart-img">
      <img
        :src="shopItem.image"
        alt=""
      >
    </div>
    <div class="info">
      <div class="cart-info">
        <h3 :title="shopItem.title"> {{ shopItem.title }} </h3>
        <p :title="shopItem.desc"> {{ shopItem.desc }} </p>
      </div>
      <div class="cart-info-bottom">
        <span class="price">{{ shopItem.price | fomartSign('price') }}</span>
        <span>{{ shopItem.count | fomartSign('count') }}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    shopItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isChecked: {
      type: Boolean,
      //   default: false
    }
  },
  filters: {
    fomartSign(data, sign) {
      //   console.log("需要加符号", sign);
      if (sign == "price") {
        return '￥' + data;
      } else if (sign == "count") {
        return 'x' + data;
      }
    }
  },
  data() {
    return {

    };
  },
  methods: {
    itemClick() {
      this.$emit("itemClick");
    }

  },
  created() {
  }
}
</script>

<style scoped>
.shop-item {
  display: flex;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.check-box {
  line-height: 110px;
  padding: 0 4px;
}
.cart-img img {
  width: 76px;
  border-radius: 8px;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
}
.cart-info h3,
.cart-info p {
  width: 260px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-bottom: 5px;
}
.cart-info-bottom {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.cart-info-bottom .price {
  color: var(--color-high-text);
}
</style>
<template>
  <div v-if="Object.keys(goods) && Object.keys(goods).length != 0">
    <div class="cloth-desc"> {{ goods.clothDesc }} </div>
    <div class="price">
      <div class="new-price"> {{ goods.price }} </div>
      <div class="old-price"> {{ goods.oldPrice }} </div>
      <span
        class="discount"
        v-if="goods.discountDesc != ''"
      > {{ goods.discountDesc }} </span>
    </div>

    <div class="desc">
      <span
        v-for="(item, index) in goods.columns"
        :key="index"
      > {{ item }} </span>
    </div>

    <div class="note">
      <div
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img
          :src="goods.services[index].icon"
          alt="icon"
        >
        <span> {{ goods.services[index].name }} </span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    goods: {
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

  },
  created() {
    //   在这里拿不到商品数据，但是页面可以显示出来
    // console.log("商品信息", this.goods);
  }
}
</script>

<style lang="scss" scoped>
.cloth-desc {
  font-size: 18px;
  padding: 2px 5px;
  line-height: 30px;
}
.price {
  display: flex;
  .new-price {
    font-size: 22px;
    color: var(--color-high-text);
    padding-left: 8px;
  }
  .old-price {
    height: 26px;
    margin-top: 6px;
    padding: 0 4px;
    text-decoration: line-through;
  }
  .discount {
    display: inline-block;
    background-color: var(--color-high-text);
    border-radius: 8px;
    color: #fff;
    width: 74px;
    height: 22px;
    font-size: 15px;
    text-align: center;
  }
}
.desc {
  display: flex;
  justify-content: space-between;
  //   padding-bottom: 10px;
  padding: 0 5px 8px;
  border-bottom: 1px solid #ccc;
}
.note {
  font-size: 14px;
  padding: 20px 6px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  img {
    width: 20px;
    vertical-align: middle;
    margin-top: -2px;
  }
}
</style>
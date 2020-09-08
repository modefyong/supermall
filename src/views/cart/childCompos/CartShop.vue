<template>
  <div class="cart-shop">

    <scroll
      class="cart-scroll"
      ref="scroll"
    >
      <cart-shop-item
        v-for="(item, index) in cartShop"
        :key="index"
        :shopItem="item"
        ref="item"
        @itemClick="itemClick"
      ></cart-shop-item>
    </scroll>

    <div class="statistics">
      <div class="select-all">
        <input
          type="checkbox"
          name=""
          id="allSelect"
          ref="allSelect"
          :checked="isNowChecked"
          @click="clickSelect"
        >
        <label for="allSelect"> 全选 </label>
        <span> 合计: {{ totalPrice | formatTotal }} </span>
      </div>
      <div
        class="calc"
        @click="toCalc"
      >
        <button> 去计算（ {{ totalCount }} ） </button>
      </div>

    </div>
  </div>
</template>

<script>
import CartShopItem from './CartShopItem'

import Scroll from 'components/common/scroll/Scroll'

export default {
  components: {
    CartShopItem,
    Scroll,
  },
  props: {
    cartShop: {
      type: Array,
      default() {
        return []
      }
    }
  },
  filters: {
    formatTotal(data) {
      if (data && data !== 0) {
        return '￥' + data.toFixed(2);
      } else {
        return 0
      }

    }
  },
  data() {
    return {
      // isChecked: false, // 是否全选(关联子商品复选框)
      isNowChecked: false, // 是否全选（当前页面）
      totalPrice: 0, // 选中商品总价
      totalCount: 0, // 选中商品数量
      idList: [], // 保存商品iid
    };
  },
  methods: {
    clickSelect() { // 点击全选
      this.totalPrice = 0;
      this.totalCount = 0;
      // this.isChecked = this.$refs.allSelect.checked;
      let newArr = this.cartShop.map(item => {
        item.checked = this.$refs.allSelect.checked
        return item;
      })
      // 通过vuex的mutations修改state值，不能直接操作state值
      this.$store.commit("changeSelectAll", newArr);
      this.isNowChecked = this.$refs.allSelect.checked;
      if (this.isNowChecked) {
        this.totalPrice = this.cartShop.reduce((pre, cur) => {
          this.totalCount += cur.count;
          return pre += parseFloat(cur.price) * Number(cur.count);
        }, 0);
      } else {
        this.totalPrice = 0;
        this.totalCount = 0;
      }

      // 保存商品iid数组
      this.idList = this.cartShop.map(item => {
        return item.iid;
      })

    },
    toCalc() {
      let submitData = {
        ids: this.idList,
        price: this.totalPrice,
        count: this.totalCount,
      }
      console.log("将数据传给后台", submitData);
      if (submitData.count > 0) {
        this.$toast.show("提交数据！");
      } else {
        this.$toast.show("请选择商品！");
      }
    },
    itemClick() { // 监听子组件的复选框点击
      this.totalPrice = 0;
      this.totalCount = 0;
      const selectOnlyLen = this.$refs.item.filter(item => item.$refs.itemChecked.checked).length;
      const cartShopLen = this.cartShop.length;
      //   console.log(`商品总个数共${cartShopLen}个,选中的商品有${selectOnlyLen}个`);
      if (selectOnlyLen === cartShopLen) {
        this.isNowChecked = true;
        // console.log("子商品都选中时", this.isChecked); // false
        // this.isChecked = true; // 解决取消全选失效一次的bug。原因？子商品都选中时，isChecked应该为true。
      } else {
        this.isNowChecked = false;
      }
      //   保存子商品数据
      let newCartList = [];
      this.$refs.item.map(item => {
        if (item.$refs.itemChecked.checked && item.shopItem) {
          newCartList.push(item.shopItem);
        }
      });
      //   统计子商品价格数量
      this.totalPrice = newCartList.reduce((pre, cur) => {
        if (cur) {
          this.totalCount += cur.count;
          return pre += parseFloat(cur.price) * Number(cur.count);
        }
      }, 0);

      // 保存商品iid数组
      this.idList = newCartList.map(item => {
        return item.iid;
      })

    }
  },
  mounted() {
  },
  activated() {
    // console.log("刷新");
    this.$refs.scroll.refresh();
    if (this.$refs.item) {
      this.itemClick();
    }

  }
}
</script>

<style scoped>
.cart-shop {
  height: 100vh;
  position: relative;
}
.cart-scroll {
  overflow: hidden;

  position: absolute;
  top: 0px;
  bottom: 137px;
  left: 0;
  right: 0;
}
.statistics {
  position: fixed;
  bottom: 49px;
  width: 100%;
  height: 44px;
  line-height: 44px;
  display: flex;
  justify-content: space-between;
  background-color: #ccc;
  padding-left: 10px;
}
.calc button {
  height: 44px;
  line-height: 44px;
  border: 0;
  outline: 0;
  background-color: #ff7f00;
  color: #fff;
  font-size: 14px;
  padding: 0 10px;
}
</style>
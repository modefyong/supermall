<template>
  <div class="fe-img">
    <img src="~assets/img/home/recommend_bg.jpg" alt="推荐图片" />

    <el-date-picker
      value-format="yyyy-MM-dd"
      @change="selectMain"
      v-model="valueMain"
      type="date"
      placeholder="选择日期"
    ></el-date-picker>

    <div v-for="(item, index) in list" :key="index">
      <el-date-picker
        value-format="yyyy-MM-dd"
        @change="selectly"
        v-model="check[index]"
        type="date"
        placeholder="选择日期"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => {
    return {
      valueMain: "",
      value: "",
      list: ["input", "value", "date"],
      check: []
    };
  },
  watch: {
    valueMain(val, old) {
      return val;
    }
  },
  methods: {
    selectMain(data) {
      // 改变主日期组件
      console.log(data, "发生改变");
      // this.value = data;
      // let newArr = [];
      const len = this.list.length;
      for (let i = 0; i < len; i++) {
        this.check.push(data);
      }
      // this.list.forEach(element => {
      //   newArr.push();
      // });
      // for(){

      // }
    },
    selectly(data) {
      console.log(data, "改变某个日期组件的值");
      // this.valueMain = data;
      if (data > this.valueMain) {
        this.valueMain = data;
      }
    }
  }
};
</script>

<style scoped>
/* 必须设置图片宽高，只设置包裹它的div的话，不起作用。 */
.fe-img img {
  width: 100%;
}
</style>

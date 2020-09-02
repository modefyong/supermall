<template>
  <div class="goods-info">
    <div>
      <p class="start"><span class="start-line"></span></p>
      <span> {{ detailInfo.desc }} </span>
      <p class="end"><span class="end-line"></span></p>
    </div>
    <div v-if="detailInfo.detailImage && detailInfo.detailImage.length > 0">
      <div
        v-for="(i,cindex) in detailInfo.detailImage[0].list"
        :key="cindex"
      >
        <img
          :src="i"
          alt="详情图片"
          @load="imgLoad"
        >
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0, // 记录图片加载次数
      imgLength: 0, // 图片长度
    };
  },
  methods: {
    imgLoad() {
      if (++this.counter === this.imgLength) {
        this.$emit("imgLoad");
      }
    }
  },
  watch: {
    detailInfo() {
      this.imgLength = this.detailInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
.goods-info {
  margin-top: 20px;
  text-align: center;
  background-color: #fff;
}
.start {
  text-align: left;
}
.end {
  text-align: right;
}
.start-line,
.end-line {
  display: inline-block;
  width: 110px;
  height: 1px;
  background-color: #000;
}
.start-line::before {
  content: "";
  display: inline-block;
  position: relative;
  top: -13px;
  width: 5px;
  height: 5px;
  background-color: #000;
}
.end-line::after {
  content: "";
  display: inline-block;
  position: relative;
  top: -13px;
  width: 5px;
  height: 5px;
  background-color: #000;
}
.goods-info img {
  width: 100%;
}
</style>
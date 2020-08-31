<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="图片" :title="item.title" @load="swiperLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isLoad: true, // 记录是否加载图片
    };
  },
  methods: {
    swiperLoad(){ // 监听图片加载事件(有几张图片就加载几次，发送几次事件)
      if(this.isLoad){
        this.$emit("swiperLoad");
        this.isLoad = false;
      }
    }
  }
};
</script>

<style>
</style>
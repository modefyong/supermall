<template>
  <swiper class="detail-swiper">
    <swiper-item
      v-for="(item, index) in topImgs"
      :key="index"
    >
      <img
        :src="item"
        alt="img"
      >
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImgs: {
      type: Array,
      default() {
        return []
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

<style>
.detail-swiper {
  height: 340px;
  overflow: hidden;
}
</style>
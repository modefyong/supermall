<template>
  <div class="tab-control">
    <ul>
      <li
        :class="{ active: currentIndex == index}"
        v-for="(item,index) in tabList"
        @click="changeSelectedColor(index)"
        :key="index"
      >
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tabList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    changeSelectedColor(index) {
      this.currentIndex = index;
      this.$emit("recordIndex", index);
    }
  }
};
</script>

<style scoped>
.tab-control ul {
  display: flex;
  list-style: none;
  text-align: center;
  height: 44px;
  line-height: 44px;
}
ul li {
  flex: 1;
}
span {
  padding: 5px;
}
.active {
  color: red;
}
.active span {
  border-bottom: 1px solid red;
}
</style>
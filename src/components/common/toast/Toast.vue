<template>
  <div
    class="toast"
    v-show="isShow"
  >
    {{ message }}
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      message: '',
      isShow: false,
    };
  },
  methods: {
    show(message, duration = 1000) {
      this.message = message;
      this.isShow = true;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  z-index: 999;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 12px 10px;
  border-radius: 5px;
  font-size: 18px;
}
</style>
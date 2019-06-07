<template>
  <div class="disk" :class="[activeClass]" v-html="loadedBurst" />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'BlockBurst',
  props: ['blockNumber'],

  data() {
    return {
      loadedBurst: null,
      activeClass: 'loading',
    };
  },

  methods: {
    ...mapActions(['getBlockVisual']),
  },

  created() {
    this.getBlockVisual(this.blockNumber).then((res) => {
      // Inject the svg, then transition opacity for better UX
      this.loadedBurst = res;

      setTimeout(() => {
        this.activeClass = 'loaded';
      }, 300);
    });
  },
};
</script>

<style scoped>
.disk {
  transform: rotate3d(1, 0, 0, 70deg) translateY(-380px);
  transition: all 220ms ease;
  height: 10px;
  width: 100%;
  border-radius: 50%;
  transition: all 120ms ease;
  left: 0;
}
/* .disk:hover {
  transform: rotate3d(1, 0, 0, 0deg) translateY(-230px);
  height: 180px;
  z-index: 99999;
} */
.disk.loading svg {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  opacity: 1;
  width: 100%;
}
</style>

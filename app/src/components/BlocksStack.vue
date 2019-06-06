<template>
  <div class="stack">
    <!-- <BlockBurst :block-number="7824821" /> -->
    <BlockBurst v-for="num in activeRange" :key="num" :block-number="num" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BlockBurst from './BlockBurst.vue';

export default {
  name: 'BlocksStack',

  components: {
    BlockBurst,
  },

  computed: {
    ...mapGetters(['activeRange']),
  },

  methods: {
    ...mapActions(['setRange']),
  },

  created() {
    if (!this.activeRange || this.activeRange.length <= 1) {
      this.setRange({ start: 7824821 });
    }
  },
};
</script>

<style scoped>
.stack {
  display: flex;
  flex-direction: column-reverse;
  margin: auto auto 0;
  position: relative;
  min-height: 100vh;
  width: 35vw;
}
</style>

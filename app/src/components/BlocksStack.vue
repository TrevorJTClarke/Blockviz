<template>
  <div :class="[activeClasses]">
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
    ...mapGetters(['activeRange', 'activeTypes']),
    activeClasses() {
      const c = ['stack'];

      Object.keys(this.activeTypes).map((t) => {
        if (this.activeTypes[t]) c.push(`s-active-${t}`);
        return t;
      });

      return c;
    },
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

<style>
.stack {
  display: flex;
  flex-direction: column-reverse;
  margin: auto auto 0;
  position: relative;
  min-height: 100vh;
  width: 35vw;
}

/* de-activate data classes on load */
.stack .disk svg path {
  /* fill: #CCC !important; */
  opacity: 0.05 !important;
  transition: opacity 120ms ease;
}
.stack .disk svg #circle-base {
  opacity: 0.1 !important;
}

/* active data classes */
.stack.s-active-transactions .disk svg #p-type-data {
  /* fill: #0B1F65 !important; */
  opacity: 1 !important;
}
.stack.s-active-value .disk svg #p-type-value {
  /* fill: #D7A449 !important; */
  opacity: 1 !important;
}
.stack.s-active-transactions .disk svg #p-type-transactions {
  /* fill: #0B1F65 !important; */
  opacity: 1 !important;
}
.stack.s-active-tokenTransfers .disk svg #p-type-tokenTransfers {
  /* fill: #D7A449 !important; */
  opacity: 1 !important;
}
.stack.s-active-functions .disk svg #p-type-functions {
  /* fill: #DB3F29 !important; */
  opacity: 1 !important;
}
.stack.s-active-logs .disk svg #p-type-logs {
  /* fill: #1DC690 !important; */
  opacity: 1 !important;
}
.stack.s-active-ether .disk svg #p-type-ether {
  /* fill: #414552 !important; */
  opacity: 1 !important;
}
</style>

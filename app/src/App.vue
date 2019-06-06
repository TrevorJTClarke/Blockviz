<template>
  <div class="layout">
    <div class="navigator">
      <FilterBar />
      <BlocksStack />
    </div>
    <aside class="metadata">
      fjdskal
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Web3Data from './utils/web3data';
import BlocksStack from './components/BlocksStack.vue';
import FilterBar from './components/FilterBar.vue';

export default {
  name: 'app',
  components: {
    BlocksStack,
    FilterBar,
  },

  data() {
    return {
      ws: null,
    };
  },

  computed: {
    ...mapGetters(['constants', 'wsActive']),
  },

  methods: {
    ...mapActions(['setNewBlock']),
  },

  created() {
    if (!this.wsActive) return;
    this.ws = new Web3Data({ apiKey: this.constants.apiKey });
    this.ws.connect(() => {
      this.ws.subscribe('block');
      this.ws.on('block', this.setNewBlock);
    });
  },
};
</script>

<style>
body {
  background: #e3e8ee;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  margin: 0;
}

.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.navigator {
  width: calc(100vw - 350px);
  height: 100%;
  min-height: 100vh;
}
.metadata {
  background: #f9f9f9;
  width: 350px;
  height: 100%;
  min-height: 100vh;
}
</style>

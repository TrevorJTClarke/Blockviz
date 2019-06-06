<template>
  <div class="layout">
    <div class="navigator">
      <BlocksStack />
    </div>
    <aside class="metadata">
      fjdskal
    </aside>
  </div>
</template>

<script>
import BlocksStack from './components/BlocksStack.vue';

export default {
  name: 'app',
  components: {
    BlocksStack,
  },
};
</script>

<style>
body {
  background: #e3e8ee;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

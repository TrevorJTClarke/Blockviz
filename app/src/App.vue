<template>
  <div class="layout">
    <div class="navigator">
      <div class="toggles">
        <!-- <div v-for="(value, k) in activeTypes">
          {{ k }}
          {{ value }}
        </div> -->
        <ToggleSwitch
          v-for="(value, k) in activeTypes"
          :key="k"
          :title="k"
          :active="value"
          :callback="toggleType"
          :data="k"
        />
      </div>

      <BlocksStack />
    </div>
    <aside class="metadata">
      fjdskal
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BlocksStack from './components/BlocksStack.vue';
import ToggleSwitch from './components/ToggleSwitch.vue';

export default {
  name: 'app',
  components: {
    BlocksStack,
    ToggleSwitch,
  },

  computed: {
    ...mapGetters(['activeTypes']),
  },

  methods: {
    ...mapActions(['toggleType']),
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

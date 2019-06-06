<template>
  <div
    :class="{ 'toggle-switch': true, active: data.active }"
    @click.prevent="fireCallback"
    :style="{ background: data.color, opacity: getOpacity(data) }"
  >
    <div class="toggle-icon">
      <img v-if="data.active" src="@/assets/ios-checkmark-circle.svg" />
      <img v-if="!data.active" src="@/assets/ios-checkmark-circle-outline.svg" />
    </div>
    <span :class="{ empty: !data.title }">
      {{ data.title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  // active & disabled are booleans
  props: ['data', 'callback'],

  methods: {
    fireCallback() {
      if (!this.callback) return;
      this.callback(this.data.key);
    },
    getOpacity(data) {
      return data.active ? 1 : '0.2';
    },
  },
};
</script>

<style scoped>
.toggle-switch {
  background: transparent;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  overflow: hidden;
  margin: 3px 3px 0;
}

.toggle-switch span {
  color: white;
  font-size: 9pt;
  margin: auto 5px;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.toggle-icon {
  display: flex;
}
.toggle-icon img {
  width: 16px;
  height: 16px;
  padding: 5px;
}
</style>

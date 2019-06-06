<template>
  <div
    :class="{ 'toggle-switch': true, active, disabled }"
    @click.prevent="fireCallback"
  >
    <!-- <div class="toggle-icon">
      <icon v-if="active" name="checkmark" />
      <icon v-if="!active" name="checkmark-outline" />
    </div> -->
    <span :class="{ empty: !title }">
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  // active & disabled are booleans
  props: ['title', 'active', 'data', 'callback', 'disabled'],

  methods: {
    fireCallback() {
      if (!this.callback) return;
      this.callback(this.data);
    },
  },
};
</script>

<style scoped>
.toggle-switch {
  background: white;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  overflow: hidden;
}
span {
  color: grey;
  font-size: 11pt;
  margin: auto 10px;
  white-space: nowrap;
}
</style>

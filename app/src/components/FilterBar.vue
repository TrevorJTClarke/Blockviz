<template>
  <div class="filter-bar">
    <div class="current-stats">
      <div class="block">
        <h4>{{ currentNumber }}</h4>
        <label>Current Block</label>
      </div>
    </div>

    <div class="dropdown">
      <div class="dropdown-title">
        <span>Block Range</span>
        <img src="@/assets/ios-arrow-down.svg" />
      </div>
      <div class="dropdown-content">
        <label>Start</label>
        <input type="text" name="" value="">
        <label>End</label>
        <input type="text" name="" value="">
      </div>
    </div>

    <div class="dropdown">
      <div class="dropdown-title">
        <span>Filter Data</span>
        <img src="@/assets/ios-arrow-down.svg" />
      </div>
      <div class="dropdown-content">
        <div class="toggles">
          <ToggleSwitch
            v-for="item in allTypes"
            :key="item.key"
            :data="item"
            :callback="toggleType"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ToggleSwitch from './ToggleSwitch.vue';

const addCommas = x => {
  if (!x) return 0
  const tmp = x.toString().split('.')
  tmp[0] = tmp[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return tmp.join('.')
}

const colors = {
  data: '#0B1F65',
  transactions: '#0B1F65',
  value: '#D7A449',
  tokenTransfers: '#D7A449',
  functions: '#DB3F29',
  ether: '#414552',
  logs: '#1DC690',
}

export default {
  name: 'FilterBar',
  components: {
    ToggleSwitch,
  },

  computed: {
    ...mapGetters(['activeTypes', 'currentBlock']),
    allTypes() {
      return Object.keys(this.activeTypes).map(a => {
        const t = {};
        t.key = a;
        t.title = a;
        t.color = colors[a];
        t.active = this.activeTypes[a]
        return t;
      });
    },
    currentNumber() {
      if (!this.currentBlock || !this.currentBlock.number) return '-';
      return addCommas(this.currentBlock.number);
    },
  },

  methods: {
    ...mapActions(['toggleType']),
  },
};
</script>

<style scoped>
.filter-bar {
  display: flex;
  padding: 4px;
}

.filter-bar .current-stats {
  width: 100%;
}

label {
  color: #222;
  font-size: 7pt;
  display: block;
  margin: -4px 0 0;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.dropdown {
  position: relative;
  min-width: 175px;
  margin-right: 20px;
  cursor: pointer;
}

.dropdown-title {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: rgba(0,0,0,0.05);
  border-radius: 3px;
}
.dropdown-title img {
  width: 16px;
}
.dropdown-title span {
  color: #222;
  font-size: 9pt;
  margin: 0;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.dropdown-content {
  display: none;
  background: white;
  border-radius: 3px;
  box-shadow: 0 1px 10px -2px rgba(0, 0, 0, 0.1);
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0px;
  z-index: 100;
}
.dropdown-content .toggles {
  width: 100%;
  padding: 5px 5px 8px;
}

.dropdown:hover .dropdown-content {
  display: flex;
}

.toggles {
  display: flex;
  flex-direction: column;
}

.block {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 5px 10px 0;
}

.block h4 {
  font-size: 15pt;
  letter-spacing: 0.025em;
  margin: 0;
}
</style>

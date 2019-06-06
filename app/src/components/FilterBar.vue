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
        <div class="range-options">
          <button class="btn" @click.prevent="goToLatest">Go To Latest</button>
          <label>End Block</label>
          <input type="number" v-model="end">
          <label>Start Block</label>
          <input type="number" v-model="start">
          <button class="btn btn-blue" @click.prevent="updateRange">Update</button>
        </div>
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

  data() {
    return {
      start: 0,
      end: 0,
    };
  },

  computed: {
    ...mapGetters(['activeTypes', 'activeRange', 'currentBlock']),
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
    ...mapActions(['toggleType', 'setRange']),
    goToLatest() {
      // TODO:
    },
    updateRange() {
      // TODO: check that the range is valid!
      console.log('this.end, this.start', this.end, this.start)
      this.setRange(this)
    },
  },

  mounted() {
    if (this.activeRange && this.activeRange.length > 0) {
      this.start = this.activeRange[0]
      this.end = this.activeRange.length > 1 ? this.activeRange[this.activeRange.length - 1] : 0
    }
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

.btn {
  border: 0;
  background: lightgray;
  border-radius: 4px;
  padding: 6px;
  cursor: pointer;
  outline: 0;
}

.btn.btn-blue {
  background: #1DC690;
  color: #fff;
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

.dropdown.active .dropdown-content,
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

.range-options {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
}
.range-options input {
  padding: 6px 0;
  font-size: 10pt;
  width: 100%;
  display: inline-block;
  border: 0;
  border-bottom: 1px solid grey;
  margin-bottom: 15px;
  outline: 0;
}
.range-options input:focus {
  border-bottom-color: blue;
}
.range-options label {
  margin: 10px 0 0;
}
</style>

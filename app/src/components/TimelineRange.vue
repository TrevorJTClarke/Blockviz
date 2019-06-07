<template>
  <div class="timeline">
    <div class="chunk-10k" v-for="ct in blocks">
      <div class="line" v-for="c in ct">
        <i />
      </div>
    </div>
    <div :class="{timetip: true, active: true }" @click.prevent="goToBlock()">
      <!-- <div class="timetip-content"><span>{{ r0 }}</span></div> -->
      <div class="timetip-content"><span></span></div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
import { addCommas } from '../utils/helpers.js';

const startBlock = 7913337
const endBlock = 7913537
const totalBlocks = endBlock - startBlock
const multiplier = 1
const blocks = []
const sumBlocks = Math.round(totalBlocks / multiplier)

// Generate blocks
for (var i = 0; i < sumBlocks; i++) {
  blocks.push(i)
}

// Generates the UI chunks needed for divs
const array_chunks = (array, chunk_size) =>
  Array(Math.ceil(array.length / chunk_size))
    .fill()
    .map((_, index) => index * chunk_size)
    .map(begin => array.slice(begin, begin + chunk_size))

let chunkBlocks = []
chunkBlocks = array_chunks(blocks, 10)

export default {
  name: 'TimelineRange',

  data() {
    return {
      ct: [1,1,1,1,1],
      blocks: chunkBlocks,
      r0: 0,
      clientHeight: 0,
      clientHeightHalf: 0,
      scrollOffset: 0,
      offsetTop: 0,
      minOffsetTop: 0,
      sumBlocks,
      r0: 0,
      c0: 0,
      c1: 0,
      cn1: 0,
      c2: 0,
      cn2: 0,
      c3: 0,
      cn3: 0,
    };
  },

  methods: {
    goToBlock() {
      console.log('HERE')
      window.open(`https://amberdata.io/blocks/${this.r0}`)
    },
    setCurrent(c) {
      this.c0 = Math.min(sumBlocks, c)
      this.c1 = this.c0 + 1
      this.c2 = this.c0 + 2
      this.c3 = this.c0 + 3
      this.cn1 = this.c0 - 1
      this.cn2 = this.c0 - 2
      this.cn3 = this.c0 - 3
      // this.setMidpoint(this.c0)
    },
    // setMidpoint(c) {
    //   const num = Math.min(startBlock + (c * multiplier), endBlock)
    //   const rand = Math.round(Math.random() * 100)
    //   this.r0 = `${addCommas(num + rand)}`
    // },
  },
};
</script>

<style scoped>
.chunk-10k {
  padding-left: 2px;
  border-left-width: 5px;
  border-left-style: solid;
  border-left-color: rgba(0, 0, 0, .1);
}

.chunk-10k:nth-child(odd) {
  border-left-color: rgba(0, 0, 0, .3);
}

.line {
  margin: 1px 0 0 0;
  position: relative;
}

.line i {
  background: rgba(0, 0, 0, .3);
  border-radius: 0 4px 4px 0;
  display: block;
  height: 1px;
  width: 5px;
  transform-origin: left center;
  transition: width 190ms ease, background 190ms ease;
}

.line span {
  position: absolute;
  left: 25px;
  top: -5px;
}
.line:nth-child(1) i {
  width: 20px;
}
.line:nth-child(6) i {
  width: 10px;
}

.timetip {
  position: fixed;
  left: 0;
  top: 50%;
  background: rgba(0,0,0, 0.1);
  border: 2px solid black;
  border-top-width: 6px;
  border-bottom-width: 6px;
  border-radius: 3px;
  color: black;
  cursor: pointer;
  padding: 0;
  width: auto;
  min-width: 40px;
  min-height: 30px;
  opacity: 0;
  z-index: 999999;
  transition: opacity 220ms ease-in-out;
}

.timetip:after {
  content: '';
  position: absolute;
  left: -8px;
  top: -2px;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-top: 7px solid black;
  border-bottom: 7px solid transparent;
}

.timetip.active {
  opacity: 1
}

.timetip-content {
  padding: 10px;
  cursor: pointer;
}

.timeline {
  width: 75px;
  position: absolute;
  top: 20%;
  left: 4px;
}
</style>

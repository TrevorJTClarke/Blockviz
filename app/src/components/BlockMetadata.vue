<template>
  <div class="block-metadata">
    <apexcharts width="320" type="bar" :options="chartOptions" :series="series"></apexcharts>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
// import BlockBurst from './BlockBurst.vue';
import apexcharts from 'vue-apexcharts';

export default {
  name: 'BlockMetadata',

  components: {
    apexcharts,
  },

  computed: {
    // ...mapGetters(['activeRange', 'activeTypes']),
    chartOptions() {
      return {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      };
    },
    series() {
      return [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      }];
    },
  },

  methods: {
    // ...mapActions(['setRange']),
  },
};
</script>

<style>
.block-metadata {
}
</style>

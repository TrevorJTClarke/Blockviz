<template>
  <div>
    <ax-chip-address
      :hash="formatted.hash"
      :name="formatted.name"
      :symbol="formatted.symbol"
      :src="formatted.src"
      layout="simple"
      v-if="displayChip"
    />
  </div>
</template>

<script>
const imgPath =
  'https://raw.githubusercontent.com/amberdata/tokens/master/images/'

export default {
  name: 'Address',
  props: ['data', 'name'],

  computed: {

    formatted() {
      const hash =
        this.data.hash ||
        this.data.address ||
        this.data.from ||
        this.data.to ||
        this.data.tokenAddress ||
        this.data.miner
      let src = `${imgPath}${hash}.png`

      // support for object based Address data
      if (hash && typeof hash !== 'string' && !Array.isArray(hash)) {
        src = hash.address ? `${imgPath}${hash.address}.png` : null

        return {
          hash: hash.address,
          name: hash.name || this.data.name,
          symbol: hash.symbol || this.data.symbol,
          src,
        }
      }

      // fallback to old methods
      return {
        hash,
        name: this.data.name,
        symbol: this.data.symbol,
        src,
      }
    },
    displayChip() {
      return this.formatted.hash || this.formatted.name || this.formatted.symbol
    },
  },
}
</script>

<style scoped>
</style>

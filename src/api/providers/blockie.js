import { createCanvas } from 'canvas'

class Blockie {
  constructor(options) {
    // The random number is a js implementation of the Xorshift PRNG
    this.randseed = new Array(4) // Xorshift: [x, y, z, w] 32 bit values
    this.options = options

    // Immediately build an image and return
    return this.renderIcon()
  }

  seedrand(seed) {
    for (var i = 0; i < this.randseed.length; i++) {
      this.randseed[i] = 0
    }
    for (var e = 0; e < seed.length; e++) {
      this.randseed[e % 4] =
        (this.randseed[e % 4] << 5) -
        this.randseed[e % 4] +
        seed.charCodeAt(e)
    }
  }

  rand() {
    // based on Java's String.hashCode(), expanded to 4 32bit values
    var t = this.randseed[0] ^ (this.randseed[0] << 11)

    this.randseed[0] = this.randseed[1]
    this.randseed[1] = this.randseed[2]
    this.randseed[2] = this.randseed[3]
    this.randseed[3] =
      this.randseed[3] ^ (this.randseed[3] >> 19) ^ t ^ (t >> 8)

    return (this.randseed[3] >>> 0) / ((1 << 31) >>> 0)
  }

  createColor() {
    //saturation is the whole color spectrum
    const h = Math.floor(this.rand() * 360)
    //saturation goes from 40 to 100, it avoids greyish colors
    const s = this.rand() * 60 + 40 + '%'
    //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
    const l = (this.rand() + this.rand() + this.rand() + this.rand()) * 25 + '%'

    var color = 'hsl(' + h + ',' + s + ',' + l + ')'
    return color
  }

  createImageData(size) {
    var width = size // Only support square icons for now
    var height = size
    var dataWidth = Math.ceil(width / 2)
    var mirrorWidth = width - dataWidth
    var data = []

    for (var y = 0; y < height; y++) {
      var row = []
      for (var x = 0; x < dataWidth; x++) {
        // this makes foreground and background color to have a 43% (1/2.3) probability
        // spot color has 13% chance
        row[x] = Math.floor(this.rand() * 2.3)
      }
      var r = row.slice(0, mirrorWidth)
      r.reverse()
      row = row.concat(r)

      for (var i = 0; i < row.length; i++) {
        data.push(row[i])
      }
    }

    return data
  }

  buildOpts(opts) {
    const newOpts = {}

    newOpts.seed =
      opts.seed || Math.floor(Math.random() * Math.pow(10, 16)).toString(16)

    this.seedrand(newOpts.seed)

    newOpts.size = opts.size || 8
    newOpts.scale = opts.scale || 4
    newOpts.color = opts.color || this.createColor()
    newOpts.bgcolor = opts.bgcolor || this.createColor()
    newOpts.spotcolor = opts.spotcolor || this.createColor()

    return newOpts
  }

  renderIcon() {
    const opts = this.buildOpts(this.options || {})
    const imageData = this.createImageData(opts.size)
    const width = Math.sqrt(imageData.length)

    const size = opts.size * opts.scale
    const canvas = createCanvas(size, size)

    var cc = canvas.getContext('2d')
    cc.fillStyle = opts.bgcolor
    cc.fillRect(0, 0, canvas.width, canvas.height)
    cc.fillStyle = opts.color

    for (var i = 0; i < imageData.length; i++) {
      // if data is 0, leave the background
      if (imageData[i]) {
        var row = Math.floor(i / width)
        var col = i % width

        // if data is 2, choose spot color, if 1 choose foreground
        cc.fillStyle = imageData[i] == 1 ? opts.color : opts.spotcolor

        cc.fillRect(
          col * opts.scale,
          row * opts.scale,
          opts.scale,
          opts.scale,
        )
      }
    }

    return canvas.createPNGStream()
  }
}

module.exports = Blockie

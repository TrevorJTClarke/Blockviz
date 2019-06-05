import fs from 'fs'
import path from 'path'
import stream from 'stream'
import axios from 'axios'
import AmberdataProvider from '../../providers/amberdata'
import VisualsProvider from '../../providers/visuals'

const AD = new AmberdataProvider()
const Vis = new VisualsProvider()

class Controller {
  constructor() {
    return this
  }

  async byId(req, res) {
    const blockNumber = req.params.id

    // TODO: Store generated SVG and return that first if generated!
    try {
      // Get blockchain data
      const data = await AD.getBlockTransactions(blockNumber, {
        includPrice: true,
        includeTokenTransfers: true,
        includeFunctions: true,
        includeLogs: true
      })

      // Pass data to generate blockchain vis
      const output = await Vis.blockBurst(data.records || data)

      // Return generated svg
      res.set('Content-Type', 'image/svg+xml')
      res.send(output)
    } catch (e) {
      console.log('e', e)
    }
  }
}

export default new Controller()

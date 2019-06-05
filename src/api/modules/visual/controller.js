import fs from 'fs'
import path from 'path'
import stream from 'stream'
import axios from 'axios'
import AmberdataProvider from '../../providers/amberdata'
import VisualsProvider from '../../providers/visuals'

const Amberdata = new AmberdataProvider()
const Vis = new VisualsProvider()

class Controller {
  constructor() {
    return this
  }

  async byId(req, res) {
    const blockNumber = req.params.id

    try {
      // const ref = handleAssetType(hash)
      // TODO: Pass data here!
      const output = await Vis.blockBurst()
      // console.log('output', output)
      res.set('Content-Type', 'image/svg+xml')
      res.send(output)
    } catch (e) {
      console.log('e', e)
    }
  }
}

export default new Controller()

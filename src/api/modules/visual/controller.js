import fs from 'fs'
import path from 'path'
import stream from 'stream'
import axios from 'axios'
import AmberdataProvider from '../../providers/amberdata'
import VisualsProvider from '../../providers/visuals'

const AD = new AmberdataProvider()
const Vis = new VisualsProvider()

async function processBlockVisual(blockNumber, query) {
  const visPath = path.join(__dirname, '../../../../', 'static/blocks', `${blockNumber}.svg`)

  // Check if we have generated image, if so return immediately
  if (fs.existsSync(visPath) && !query.noCache) {
    return await fs.readFileSync(visPath)
  }

  try {
    // Get blockchain data
    const data = await AD.getBlockTransactions(blockNumber, {
      includPrice: true,
      includeTokenTransfers: true,
      includeFunctions: true,
      includeLogs: true
    })
    query.blockNumber = blockNumber

    if (!data || !data.records) return ''

    // Pass data to generate blockchain vis
    const output = await Vis.blockBurst(data.records || data, query)

    // write to local file
    await fs.writeFileSync(visPath, output)

    // Return generated svg
    return output
  } catch (e) {
    console.log('e', e)
  }
}

class Controller {
  constructor() {
    return this
  }

  // Returns a block svg by block number
  async byId(req, res) {
    const { id } = req.params
    const blockNumber = id ? id.split('.')[0] : id
    const visOutput = await processBlockVisual(blockNumber, req.query)

    res.set('Content-Type', 'image/svg+xml')
    res.send(visOutput)
  }

  async processBatch(req, res) {
    // Accept block range, and process
    const { start, end } = req.query
    let total = Math.abs(parseInt(start) - parseInt(end))
    if (total > 100) total = 100
    const p = []

    // loop and form promises
    for (let i = 0; i < total; i++) {
      const num = parseInt(start) + i
      p.push(processBlockVisual(num, req.query))
    }

    try {
      const results = await Promise.all(p)
      res.send('Done')
    } catch (e) {
      console.log('e', e)
      res.send('Error')
    }
  }
}

export default new Controller()

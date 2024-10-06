import queryParser from '../plugins/queryParser.js'
import wand from '../index.js'

export default ({plugins, port, cert, key, ...router}) => wand({
  ...router,
  plugins: [queryParser].concat(plugins),
  runtime: change => {
    const server = Deno.serve({
      hostname: 'localhost',
      port,
      cert,
      key
    }, request => {
      const url = new URL(request.url)
      return change(request.method+' '+url.pathname+url.search, request)
    })
  }
})

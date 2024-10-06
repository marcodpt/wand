import queryParser from '../plugins/queryParser.js'
import wand from '../index.js'

export default ({plugins, port, cert, key, routes, ...router}) => wand({
  ...router,
  routes: {
    '*': () => new Response("Not Found", {status: 404}),
    ...routes
  },
  plugins: [queryParser].concat(plugins),
  runtime: change => {
    const server = Deno.serve({
      hostname: 'localhost',
      port,
      cert,
      key
    }, request => {
      const url = new URL(request.url)
      return change(url.pathname+url.search)
    })
  }
})

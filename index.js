import router from './src/router.js'
import queryParser from './src/queryParser.js'

export default ({init, routes, plugins, runtime}) => router({
  init: typeof init == 'function' ? init : (() => ({})),
  routes,
  runtime,
  plugins: [queryParser].concat(plugins || []).
    filter(plugin => typeof plugin == 'function')
})

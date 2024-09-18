import router from './src/router.js'
import queryParser from './src/queryParser.js'

export default ({routes, plugins, runtime}) => router({
  routes,
  runtime,
  plugins: [queryParser].concat(plugins || [])
})

import router from './src/router.js'
import queryParser from './src/queryParser.js'

export default ({routes, plugins, runtime}) => {
  routes = routes || {}
  plugins = [queryParser].concat(plugins || [])
  const change = router(routes, plugins)
}

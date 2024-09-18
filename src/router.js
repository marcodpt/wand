export default ({routes, plugins, runtime}) => {
  var done = () => {} 
  var state = null
  var isRunning = true

  const change = url => {
    if (!isRunning) {
      return
    }

    const Url = url.split('?')
    const path = Url.shift()
    const Path = path.split('/').map(decodeURIComponent)
    const query = Url.join('?')

    const {route, Params} = Object.keys(routes).reduce((match, route) => {
      const Route = route.split('/')
      if (Route.length == Path.length) {
        var weight = 1
        const Params = Path.reduce((Params, value, i) => {
          if (Params) {
            if (Route[i].substr(0, 1) == ':') {
              Params[Route[i].substr(1)] = value
            } else if (Route[i] !== value) {
              Params = null
            } else {
              weight++
            }
          }
          return Params
        }, {})
        if (Params && weight > match.weight) {
          return {
            route,
            Params,
            weight,
          }
        }
      }
      return match
    }, {
      route: '*',
      Params: {},
      weight: 0
    })

    const action = routes[route]
    if (typeof action == 'function') {
      state = plugins.
        filter(plugin => typeof plugin == 'function').
        reduce((state, plugin) => ({
          ...(plugin(state) || {}),
          ...state
        }), {url, route, path, Params, query})

      done(state)
      done = action(state) || (() => {})
    }
  }

  const finish = runtime(change) || (() => {})

  return () => {
    isRunning = false
    done(state)
    finish(state)
  }
}

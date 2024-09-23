import queryParser from '../plugins/queryParser.js'
import wand from '../index.js'

export default ({plugins, ...router}) => wand({
  ...router,
  plugins: [queryParser].concat(plugins),
  runtime: change => {
    const hashchange = () => {
      change((window.location.hash || '#/').substr(1))
    }

    window.addEventListener('hashchange', hashchange)
    hashchange()
    return () => {
      window.removeEventListener('hashchange', hashchange)
    }
  }
})

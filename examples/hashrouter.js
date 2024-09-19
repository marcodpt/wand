import wand from "../index.js"

window.wand({
  init: () => {
    const view = document.getElementById('view')
    return {
      index: 0,
      home: view.innerHTML,
      render: html => {view.innerHTML = html}
    }
  },
  routes: {
    '/': ({
      render, home
    }) => render(home),
    '/hello/:name': ({
      render, Params
    }) => render(`<h1>Hello ${Params.name}</h1>`),
    '*': ({
      render
    }) => render(`<h1>404: Page Not Found</h1>`) 
  },
  plugins: [
    state => {
      state.index++
    },
    state => {
      document.getElementById('output')?.
        textContent = JSON.stringify(state, undefined, 2)
    }
  ],
  runtime: change => {
    const update = () => {
      console.log('update')
      change((window.location.hash || '#/').substr(1))
    }

    window.addEventListener('hashchange', update)
    return () => {
      window.removeEventListener('hashchange', update)
    }
  }
})

# ![](favicon.ico) Wand

  A tiny JS router that makes no assumptions about its usage.

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  [Demo](https://marcodpt.github.io/wand/)

## ❤️ Features
 - ES6 module.
 - Support browser and any javascript runtime
([node](https://nodejs.org/en), [deno](https://deno.com/), etc).
 - Pure functional design.
 - Everything is a plugin.
 - Designed following the principles of
[UNIX philosophy](https://en.wikipedia.org/wiki/Unix_philosophy).
 - Tiny codebase, very understandable.
 - Very well tested.
 - Ridiculously small API. After reading this file you will understand `Wand`
better than me.

## 💡 Showcase: A hash router

`Wand` makes no assumptions about the environment it will be used in, and this
example can be easily migrated to a server-side router or any other type of
application.

[Demo](https://marcodpt.github.io/wand/)
[Source](https://github.com/marcodpt/wand/blob/main/index.html)

```html
<body>
  <nav>
    <a href="#/">Home</a> |
    <a href="#/hello/Mary">Hello Mary</a> |
    <a
      href="#/hello/John?age=25&pets[]=dog&pets[]=cat"
    >Hello John</a> |
    <a href="#/goodbye?name=stranger">Goodbye</a> |
    <a href="#/clock">Clock</a> |
    <a href="#/wrong/route">404</a> |
    <a href="javascript:stop()">Stop Router</a> |
    <a href="https://github.com/marcodpt/wand">Repository</a>
  </nav>
  <main>
    <h1>Home Page</h1>
  </main>
  <pre>
    <code></code>
  </pre>
  <script type="module">
    import wand from "https://cdn.jsdelivr.net/gh/marcodpt/wand/index.js"

    window.stop = wand({
      init: () => {
        const main = document.body.querySelector('main')
        return {
          index: 0,
          home: main.innerHTML.trim(),
          render: html => {main.innerHTML = html}
        }
      },
      routes: {
        '/': ({
          render, home
        }) => render(home),
        '/hello/:name': ({
          render, Params
        }) => render(`<h1>Hello ${Params.name}</h1>`),
        '/clock': ({render}) => {
          const tick = () => {
            console.log('tick')
            const time = new Date()
            render(`<h1>${[
              time.getHours(),
              time.getMinutes(),
              time.getSeconds()
            ].map(n => (n < 10 ? '0' : '')+n).join(':')}</h1>`)
          }
          const itv = setInterval(tick, 100)
          return () => {clearInterval(itv)}
        },
        '/goodbye': ({render, Query}) => {
          render(`<h1>Goodbye message before leaving!</h1>`)
          return () => {window.alert(`Goodbye ${Query.name}!`)}
        },
        '*': ({
          render
        }) => render(`<h1>404: Page Not Found</h1>`) 
      },
      plugins: [
        state => {
          state.index++
        },
        state => {
          document.body.querySelector('code').
            textContent = JSON.stringify(state, undefined, 2)
        }
      ],
      runtime: change => {
        const hashchange = () => {
          console.log('hashchange')
          change((window.location.hash || '#/').substr(1))
        }

        window.addEventListener('hashchange', hashchange)
        hashchange()
        return () => {
          window.removeEventListener('hashchange', hashchange)
        }
      }
    })
  </script>
</body>
```

## 📖 API

### wand({init?, routes, plugins?, runtime}) => stop

#### init: () => state
Optional function called once to create the initial `state`
(this must be an `object`).

#### routes: {route: action}
Object that defines the possible `routes`.

##### route: string
Accepts `*` to match any path and `:param` to declare variable.

##### action: state => done?
A function that will be called whenever `route` is matched in a route `change`.

##### done: state => ()
An optional function that will be called before the new `route` `action`, with
the `state` of the new `route` to end the current `route`.

#### plugins: [state => ()]
An optional array of `plugins`, which are executed sequentially with each
`route` `change` and which can modify the `state` before the `action`
associated with the new `route` or the `done` function associated with the old
`route` are called.

#### runtime: change => finish?
The router `runtime`.

##### change: url => ()
Whenever called, it will trigger a `change` of `route`, with the
`url` (`string`) being associated with the `state`.

##### finish: state => ()
Optional function to terminate the `runtime`, receives the current `state` of
the `route` as a parameter.

#### stop: () => ()
Calls the `finish` function of the `runtime` with the contents of the current
`state`, and from then on any call to the `change` function within the
`runtime` will be ignored.

### state: object
The state is initialized by the `init` function or as an empty `object`
(if this is not passed).

Listed here are the `state` properties that are modified with each `route`
`change`. Note that `plugins` can also modify `state` properties.

#### url: string
The `url` as passed to the `change` function.

#### route: string
The `route` that matched as declared.

#### path: string
The part of the `url` before the `?`.

#### Params: object
Object containing the variables declared in the `route` with the associated
values in the current `path`.

#### query: string
The part of `url` after the `?`.

#### Query: object
Parsed query string.

## 🤝 Contributing
It's a very simple project.
Any contribution, any feedback is greatly appreciated.

## ⭐ Support
If this project was useful to you, consider giving it a star on github, it's a
way to increase evidence and attract more contributors.

# ![](favicon.ico) Wand

  A tiny JS router that makes no assumptions about its usage.

  [![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/wand/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![GitHub Tag](https://img.shields.io/github/v/tag/marcodpt/wand)](https://github.com/marcodpt/wand/tags)
  [![bundlejs](https://deno.bundlejs.com/badge?q=https://raw.githubusercontent.com/marcodpt/wand/main/index.js&treeshake=[*])](https://bundlejs.com/?q=https://raw.githubusercontent.com/marcodpt/wand/main/index.js&treeshake=[*])

## ❤️ Features
 - [ES6 module](https://github.com/marcodpt/wand/blob/main/index.js).
 - Support
[browser](https://github.com/marcodpt/wand/blob/main/src/runtimes/hashRouter.js),
[node](https://nodejs.org/en), [deno](https://deno.com/).
 - Pure functional design.
 - [Tiny codebase](https://github.com/marcodpt/wand/blob/main/src/index.js),
very understandable.
 - Everything is a
[plugin](https://github.com/marcodpt/wand/blob/main/src/plugins/).
 - Pre-built
[runtimes](https://github.com/marcodpt/wand/blob/main/src/runtimes/)
for easy use.
 - Designed following the principles of
[UNIX philosophy](https://en.wikipedia.org/wiki/Unix_philosophy).
 - Very well [tested](https://marcodpt.github.io/wand/tests/).
 - Ridiculously small [API](#-api). After reading this file you will
understand `Wand` better than me.

## 💡 Showcase: A hash router

`Wand` makes no assumptions about the environment it will be used in, and this
example can be easily migrated to a server-side router or any other type of
application.

[![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/wand/)
[![Source](https://img.shields.io/badge/Source-gray)](https://github.com/marcodpt/wand/blob/main/index.html)

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
    import {hashRouter} from "https://cdn.jsdelivr.net/gh/marcodpt/wand/index.js"

    window.stop = hashRouter({
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
      ]
    })
  </script>
</body>
```

## 💻 Usage

### Hash router in the browser.
This example already makes use of the `queryParser` `plugin` and
implements the `runtime` of a hash router.

```js
import {hashRouter} from "https://cdn.jsdelivr.net/gh/marcodpt/wand/index.js"
```

### Building your own runtime
This example is for those who want a more customized experience to create
their own `runtime` and eventually make use of `plugins`.

```js
import {wand, queryParser} from "https://cdn.jsdelivr.net/gh/marcodpt/wand/index.js"
```

## 📖 API

### runtimes: ({init?, routes, plugins?}) => stop
`Runtimes` are thin layers built on top of `Wand` with the aim of bringing
simplicity to a specific use, they are open to contributions.

#### hashRouter
Made to be used in the browser, it already has the `queryParser` plugin by
default.

[![Source](https://img.shields.io/badge/Source-gray)](https://github.com/marcodpt/wand/blob/main/src/runtimes/hashRouter.js)

### plugin: state => ()
`Plugins` can modify the `state` with each `change` of route, and were designed
to be easy to develop without changing the way the `Wand` core works.

Enabling maximum flexibility and contributions.

#### queryParser
The default parser for query string due to its simplicity.
Adds the `Query` property to the `state`.

[![Source](https://img.shields.io/badge/Source-gray)](https://github.com/marcodpt/wand/blob/main/src/plugins/queryParser.js)

##### Query: object
Parsed query string.

### wand: ({init?, routes, plugins?, runtime}) => stop
`Runtimes` are built on top of the library.
And the `plugins` are designed for it.

The idea is to bring a simple router to your core but at the same time with a
complete `plugin` system and easy-to-use `runtimes`.

[![Source](https://img.shields.io/badge/Source-gray)](https://github.com/marcodpt/wand/blob/main/src/index.js)

#### init: () => state
Optional function called once to create the initial `state`
(this must be an `object`).

#### routes: {route: action}
Object that defines the possible `routes`.

##### route: string
Accepts `*` to match any path and `:param` to declare variable.

##### action: (state, ...args) => done | response
A function that will be called whenever `route` is matched in a route `change`.

All other `args` passed by the `change` function will be passed to the
`action`.

##### done: state => ()
An optional function that will be called before the new `route` `action`, with
the `state` of the new `route` to end the current `route`.

##### response: any
If it is not a `done` function, it will be treated as a `response` and
returned in the `change` function.

#### plugins: [state => ()]
An optional array of `plugins`, which are executed sequentially with each
`route` `change` and which can modify the `state` before the `action`
associated with the new `route` or the `done` function associated with the old
`route` are called.

#### runtime: change => finish?
The router `runtime`.

##### change: (url, ...args) => response
Whenever called, it will trigger a `change` of `route`, with the
`url` (`string`) being associated with the `state`.

All other `args` will be passed to the `action`.

##### finish: state => ()
Optional function to terminate the `runtime`, receives the current `state` of
the `route` as a parameter.

#### stop: () => ()
Calls the `finish` function of the `runtime` with the contents of the current
`state`, and from then on any call to the `change` function within the
`runtime` will be ignored.

### state: object
The state is initialized by the `init` function or as an empty `object`
(if `init` is not passed).

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

## ⭐ Support
If this project was useful to you, consider giving it a star on github, it's a
way to increase evidence and attract more contributors.

## 📦 Projects using this module
If your project is not on the list, submit a pull request, it is a way to
increase awareness of your project and this module.

 - [Merlin](https://github.com/marcodpt/merlin): A functional JS framework that
values elegance, simplicity and minimalism. 
 - [Paw](https://github.com/marcodpt/paw): A low-code, vdom-free hyperscript
framework.

## 🪟 Alternatives
This list of alternatives serves to find the most suitable module for your
project but also and mainly to serve as a reference for implementation ideas
and improvements. All contributions are welcome.

 - [universal-router](https://github.com/kriasoft/universal-router): A simple middleware-style router for isomorphic JavaScript web apps 
 - [director](https://github.com/flatiron/director): A tiny and isomorphic URL router for JavaScript.
 - [page.js](https://github.com/visionmedia/page.js): Micro client-side router inspired by the Express router (~1200 bytes).
 - [pathjs](https://github.com/mtrpcic/pathjs): Simple, lightweight routing for web browsers.
 - [crossroads](https://github.com/millermedeiros/crossroads.js): JavaScript Routes.
 - [davis.js](https://github.com/olivernn/davis.js): RESTful degradable JavaScript routing using pushState.
 - [router](https://github.com/progrape/router): A very simple router for the demo of WeUI
 - [navigo](https://github.com/krasimir/navigo): A simple vanilla JavaScript router.
 - [router.js](https://github.com/tildeio/router.js/)
 - [slim-router](https://github.com/haithembelhaj/slim-router): A Javascript Router based on History.js
 - [router.js](https://github.com/ramiel/router.js/): Router.js is a simple and powerful javascript library to handle routing
 - [router](https://github.com/vaadin/router): Small and powerful client-side router for Web Components. Framework-agnostic.
 - [react-router](https://github.com/remix-run/react-router): Declarative routing for React
 - [vue-router](https://github.com/vuejs/vue-router): The official router for Vue 2
 - [ui-router](https://github.com/ui-router/angular): UI-Router for Angular: State-based routing for Angular (v2+)
 - [express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework for node.
 - [koa-route](https://github.com/koajs/route): Simple route middleware

## 🤝 Contributing
It's a very simple project.
Any contribution, any feedback is greatly appreciated.

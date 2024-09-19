# ![](favicon.ico) Wand

  A tiny JS router that makes no assumptions about its usage.

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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

```js
import wand from "https://cdn.jsdelivr.net/gh/marcodpt/wand/index.js"
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
associated with the `route` is called.

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

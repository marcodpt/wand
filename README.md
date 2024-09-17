# ![](favicon.ico) Wand

  A tiny JS router that makes no assumptions about its usage.

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ❤️ Features
 - ES6 module.
 - Support browser and any javascript runtime (node, deno, etc).
 - Pure functional design.
 - Everything is a plugin.
 - Designed following the principles of
[UNIX philosophy](https://en.wikipedia.org/wiki/Unix_philosophy).
 - Tiny codebase, very understandable.
 - Very well tested with [Zora](https://github.com/lorenzofox3/zora).
 - Ridiculously small API. After reading this file you will understand `Wand`
better than me.

## 💡 Showcase: A hash router

`Wand` makes no assumptions about the environment it will be used in, and this
example can be easily migrated to a server-side router or any other type of
application.

```js
import wand from "https://cdn.jsdelivr.net/gh/marcodpt/wand/index.min.js"
```

## 📖 API

### wand({routes, plugins?, runtime}) => stop
 - `routes` **{route: action}**:
   - `route` **string**:
Accepts `*` to match any path and `:param` to declare variable.
   - `action` **routeData => done**: 
A function that will be called every time the route is started, returning the initial state.
     - `done` **newState => ()**:
 - `plugins` **[routeData => {...newData, ...routeData}]**:
An optional array of plugins, which are executed sequentially with each route
change and must return a object whose properties will be attached to
`routeData`.
 - `runtime` **change => finish**:
   - `change` **url => ()**:
   - `finish` **routeData => ()**:
 - `stop` **() => ()**:
Calls the `finish` function of the `runtime` with the contents of the current
`routeData`, and from then on any call to the `change` function within the
`runtime` will be ignored.

#### routeData {url, route, path, Params, query, Query, ...newData, previous}
 - `url` **string**: 
The `url` as it was passed.
 - `route` **string**:
The `route` that matched as declared.
 - `path` **string**:
The part of the `url` before the `?`.
 - `Params` **Object**: 
Object containing the variables declared in the `route` with the associated
values in the current `path`.
 - `query` **string**:
The part of `url` after the `?`.
 - `Query` **Object**:
Parsed query string.
 - `newData`
New properties introduced by plugins.
 - `previous` **routeData**:
Previous `routeData` or `null`.

## 🤝 Contributing
It's a very simple project.
Any contribution, any feedback is greatly appreciated.

## ⭐ Support
If this project was useful to you, consider giving it a star on github, it's a
way to increase evidence and attract more contributors.

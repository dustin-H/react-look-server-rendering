# react-look-server-rendering
React-Look extension to render styles optimized on the server

Renders all needed styles after rendering react and resets it's cache. You can also reset manually.

> react-look is a peer-dependency!

## Installation

```
npm install react-look-server-rendering --save
```

## Usage

```js
import { plugin, renderToString as lookRenderToString, reset } from 'react-look-server-rendering'

// Add the plugin to your look-config
serverConfig.plugins.push(plugin)

// Get CSS string after each react.renderToString()
let styles = lookRenderToString()

// Optionally reset the cache by yourself
reset()
```

## License

[MIT](LICENSE)

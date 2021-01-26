# ta-proxy
Acts as a proxy to serve schema files from "Technische Alternative" (TA) systems.

## Getting started:

1. Install dependencies with `npm install`

2. Setup config in index.js
```js
const config = {
  taIp: 'http://IP.OF.LOCAL.TA.SERVER',
  taCredentials: {
    username: '', // default for ta systems: admin
    password: '', // default for ta systems: admin
  },
  schemaFileRange: [1, 1], // select what schema files should be allowed
}
```

3. Run proxy with `node index.js`; proxy runs on port 8080 by default

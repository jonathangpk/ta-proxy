const express = require('express')
const helmet = require('helmet')
const request = require('request');

const config = {
  taIp: 'http://IP.OF.LOCAL.TA.SERVER',
  taCredentials: {
    username: '', // default admin
    password: '', // default admin
  },
  schemaFileRange: [1, 1], // select what schema files should be allowed
}
const base64 = new Buffer(`${config.taCredentials.username}:${config.taCredentials.password}`).toString('base64')
const basicAuth = `Basic ${base64}`

const headers = { 'Authorization': basicAuth }

const app = express()

app.use(helmet())

app.get('/schema/:id', (req, res) => {
  const id = req.params.id
  if (id < config.schemaFileRange[0] || id > config.schemaFileRange[1]) {
    res.statusCode = 404
    res.send()
  } else {
    const url = `${config.taIp}/schema.html#${id}`
    request.get(url, { headers }).pipe(res)
  }
})

const whiteListAssets = [
  // '/schema/style/*',
  // '/schema/js/*',
  // '/schema/schematic_files/*',
  '/schema/style/webi/jquery-ui-1.10.0.custom.css',
  '/schema/style/schema.css',
  '/schema/style/webi/images/ui-bg_highlight-soft_70_F0F0F0_1x100.png',
  '/schema/style/webi/images/ui-icons_000000_256x240.png',
  '/schema/images/bigloader.gif',
  '/schema/schematic_files/1.cgi',
  '/schema/schematic_files/1.html',
  '/schema/schematic_files/1.png',
  '/schema/js/jquery-1.9.0.js',
  '/schema/js/jquery-ui.js',
  '/schema/js/jquery.ui.touch-punch.js',
  '/schema/js/scheme.js',
  '/schema/js/schemabrand.js',
]

whiteListAssets.forEach(path => {
  app.get(path, (req, res) => {
    path = req.path.substring(7)
    const url = config.taIp + path + '?_=' + (+new Date())
    request.get(url, { headers }).pipe(res)
  })
})

app.get('*', (req, res) => {
  res.statusCode = 401
  res.send()
})

app.listen(8080)

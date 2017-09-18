/**
 * Module Dependencies
 */
const config = require('./config')
const restify = require('restify')
const restifyPlugins = require('restify').plugins

/**
  * Initialize Server
  */
const server = restify.createServer({
  name: config.name,
  version: config.version
})

/**
  * Middleware
  */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }))
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser({ mapParams: true }))
server.use(restifyPlugins.fullResponse())

/**
  * Start Server, Connect to DB & Require Routes
  */
server.listen(config.port, () => {
  // db.on('error', (err) => {
  //   console.error(err)
  //   process.exit(1)
  // })

  // db.once('open', () => {
  //   require('./routes')(server)
  //   console.log(`Server is listening on port ${config.port}`)
  // })
  require('./routes')(server)
  console.log(`Server is listening on port ${config.port}`)
})

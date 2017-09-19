/**
 * Module Dependencies
 */
const config = require('./config')
const restify = require('restify')
const restifyPlugins = require('restify').plugins
const mysql = require('mysql')

const mongoose = require('mongoose')

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
  // establish connection to mysql
  const connectionPool = mysql.createPool({
    connectionLimit: config.db.connectionLimit,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
  })

  connectionPool.getConnection((err) => {
    if (err) {
      console.error('Error connecting: ' + err.stack)
      return
    }

    require('./routes')(server, connectionPool)
    console.log(`Server is listening on port ${config.port}`)
  })
})

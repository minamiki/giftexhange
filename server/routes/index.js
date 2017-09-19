
/**
 * Module Dependencies
 */
const errors = require('restify-errors')
const GiftExchange = require('../app/index')

module.exports = function (server, connectionPool) {
    /**
     * GET
     */
  server.get('/exchange/test', (req, res, next) => {
    GiftExchange.test(res, connectionPool)
  })
}

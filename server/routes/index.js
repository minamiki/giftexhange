
/**
 * Module Dependencies
 */
const errors = require('restify-errors')

module.exports = function (server) {
	/**
	 * GET
	 */
  server.get('/exchange/test', (req, res, next) => {
    res.send('ok')
  })
}

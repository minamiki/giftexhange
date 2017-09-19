module.exports = function (server, connectionPool) {
  /**
   * Module Dependencies
   */
  const errors = require('restify-errors')
  const GiftExchange = require('../app/index')({
    connectionPool, errors
  })
  const Generator = require('../app/generator')

  /**
    * Test Endpoint
    */
  server.get('/exchange/test', (req, res, next) => {
    GiftExchange.test(req, res, next)
  })

  /**
  * Exchange Endpoints
  */
  // Generate sender/reciever pairs and save to db
  server.get('/exchange/:eventId/generate', (req, res, next) => {
	let GeneratorQuery = new Generator(connectionPool)
	let result = GeneratorQuery.generateResult(1, connectionPool)

	return res.send(result)
  })

  // send out email
  server.get('/exchange/:eventId/email', (req, res, next) => {
    GiftExchange.email(req, res, next)
  })

  // get event status
  server.get('/exchange/:eventId/status', (req, res, next) => {
    let eventId = req.params.eventId
  })

  /**
  * Wishlist Endpoints
  */
  // Save wishlist
  server.post('wishlist/:idHash', (req, res, next) => {
    let idHash = req.params.idHash
  })

  // Read wishlist
  server.get('wishlist/:idHash', (req, res, next) => {
    let idHash = req.params.idHash
    let result = {
      id: idHash,
      userId: 1,
      userName: 'Pey Lun',
      list: [{
        id: 1,
        name: 'ipad',
        description: 'ipad of any generation as long as it is in good working condition',
        urlLink: 'http://www.ipad.com'
      }, {
        id: 2,
        name: 'Google Pixel2',
        description: 'Preferably pixel 2, otherwise pixel 1 is fine as well',
        imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3R8id8wr5MNCjULReMc1Q9W3rfhYlVIQCYiJguCqoXWUNaHAjGGrapJI'
      }]
    }
    res.send(JSON.parse(JSON.stringify(result)))
  })

  /**
  * Event Endpoints
  */
  // Create Event
  server.post('event', (req, res, next) => {

  })

  /**
  * User Endpoints
  */
  // Create user
  server.post('user', (req, res, next) => {

  })

  // Get user
  server.get('user/:id', (req, res, next) => {
    let id = req.params.id
  })
}

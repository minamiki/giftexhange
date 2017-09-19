module.exports = function (server, connectionPool) {
  /**
   * Module Dependencies
   */
  const errors = require('restify-errors')
  const GiftExchange = require('../app/index')({
    connectionPool, errors
  })
  const Generator = require('../app/generator')
  const Wishlist = require('../app/wishlist')
  const WishlistItem = require('../app/wishlistItem')

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
    if (req.params.eventId) {
      GiftExchange.email(req.params.eventId, res)
    }
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
    let result = {
      list: []
    }
    res.send(JSON.parse(JSON.stringify(result)))
  })

  // Read wishlist
  server.get('wishlist/:id', (req, res, next) => {
    const WishlistQuery = new Wishlist(connectionPool)
    const WishlistItemQuery = new WishlistItem(connectionPool)
    WishlistQuery.getById(req.params.id).done((response) => {
      WishlistItemQuery.getByWishlistId(req.params.id).done((items) => {
        response[0].list = items
        res.send(response[0])
      })
    })
  })

  /**
   ** WISHLIST ITEMS
   **/
  server.get('wishlist/:id/item', (req, res, next) => {
    const WishlistItemQuery = new WishlistItem(connectionPool)
    WishlistItemQuery.getByWishlistId(req.params.id).done((response) => {
      res.send(response)
    })
  })

  server.get('wishlist/:id/item/:itemId', (req, res, next) => {
    const WishlistItemQuery = new WishlistItem(connectionPool)
    WishlistItemQuery.getById(req.params.itemId).done((response) => {
      res.send(response)
    })
  })

  server.post('wishlist/:id/item', (req, res, next) => {
    const WishlistItemQuery = new WishlistItem(connectionPool)
    WishlistItemQuery.create(req.params.id, req.body).done((response) => {
      reqObj.id = response.insertId
      res.send(reqObj)
    })
  })

  server.put('wishlist/:id/item/:itemId', (req, res, next) => {
    const WishlistItemQuery = new WishlistItem(connectionPool)
    WishlistItemQuery.update(req.params.itemId, req.body).done((response) => {
      res.send(response)
    })
  })

  server.del('wishlist/:id/item/:itemId', (req, res, next) => {
    WishlistItemQuery.delete(req.params.itemId).done((response) => {
      res.send(response)
    })
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

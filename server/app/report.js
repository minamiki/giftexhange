const BaseConnection = require('./baseConnection')

module.exports = class Report extends BaseConnection {
    constructor(connectionPool) {
        super(connectionPool)
    }

    getEmptyWishlist() {
        const sql = 'SELECT * FROM users WHERE id IN (SELECT userId FROM wishlist WHERE id NOT IN (SELECT wishlistId FROM wishlist_items))'
        return this.query(sql)
    }
}
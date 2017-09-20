const BaseConnection = require('./baseConnection')
const Promise = require('promise')

module.exports = class WishlistItem extends BaseConnection {
	getByWishlistId(wishlistId) {
		return this.query(`SELECT * FROM wishlist_items WHERE wishlistId = ${wishlistId}`)
	}
	getById(id) {
		return this.query(`SELECT * FROM wishlist_items WHERE id = ${id}`)
	}
	create(wishlistId, object) {
		return this.query(`INSERT INTO wishlist_items (wishlistId, name, description, imageLink, urlLink) VALUES (${wishlistId}, '${object.name}', '${object.description}', '${object.imageLink}', '${object.urlLink}')`)
	}
	update(id, object) {
		return this.query(`UPDATE wishlist_items SET name = '${object.name}', description='${object.description}', imageLink = '${object.imageLink}', urlLink = '${object.urlLink}' WHERE id=${id}`)
	}
	delete(id) {
		return this.query(`DELETE FROM wishlist_item WHERE id=${id}`)
	}
}
const BaseConnection = require('./baseConnection')
const Promise = require('promise')

module.exports = class WishlistItem extends BaseConnection {
	getItems(wishlistId) {
		return this.query(`SELECT * FROM wishlist_items WHERE wishlistId = ${wishlistId}`)
	}
	getItemById(id) {
		return this.query(`SELECT * FROM wishlist_items WHERE id = ${id}`)
	}
	addItem(wishlistId, object) {
		return this.query(`INSERT INTO wishlist_items (wishlistId, name, description, imageLink, urlLink) VALUES (${wishlistId}, '${object.name}', '${object.description}', '${object.imageLink}', '${object.urlLink}')`)
	}
	editItem(id, object) {
		return this.query(`UPDATE wishlist_items SET(name = '${object.name}', description='${object.description}', imageLink = '${object.imageLink}', urlLink = '${object.urlLink}') WHERE id=${id}`)
	}
	deleteItem(id) {
		return this.query(`DELETE FROM wishlist_item WHERE id=${id}`)
	}
}
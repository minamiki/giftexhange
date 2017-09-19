'use strict'
import 'bootstrap'
import './scss/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import WishList from './components/WishList'

// TODO: fetch user info & wishlist
const wishlist = [{
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

// $.get(`wishlist/1`, (data) => {
// 	data = {list: wishlist}
	
// })
ReactDOM.render(<WishList editable={true} wishlist={wishlist}/>, document.getElementById('main-content'))

'use strict'
import 'bootstrap'
import './scss/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import WishList from './components/WishList'

const searchParams = new URLSearchParams(window.location.search); //?anything=123
const id = searchParams.get('id')
const userId = searchParams.get('userId')
const url = `/api/wishlist/${id}`
const saveWishList = (wishlist, onSuccessCallback) => {
	$.post(url, {
		list: wishlist
	}).done((resp) => {
		onSuccessCallback(resp.list)
	})
}

// TODO: fetch user info & wishlist
$.get(url, (resp) => {
	const editable = resp.userId === Number(userId)
	ReactDOM.render(
		<WishList 
			name={resp.userName} editable={editable} wishlist={resp.list}
			saveWishList={(wishlist, onSuccessCallback) => saveWishList(wishlist, onSuccessCallback)}
		/>, 
		document.getElementById('main-content'))
})

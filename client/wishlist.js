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
const itemUrl = `${url}/item`
const saveWish = (wishDetails, onSuccessCallback) => {
	const method = wishDetails.id ? 'PUT' : 'POST'
	const url = wishDetails.id ? `${itemUrl}/${wishDetails.id}` : itemUrl

	$.ajax({
		url: url,
		method: method,
        contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(wishDetails)
	}).done((resp) => {
		onSuccessCallback(resp)
	})
}
const deleteWish = (wishDetails, onSuccessCallback) => {
	$.ajax({
		url: `${itemUrl}/${wishDetails.id}`,
		method: 'DELETE'
	}).done(() => {
		onSuccessCallback()
	})
}

// TODO: fetch user info & wishlist
$.get(url, (resp) => {
	const editable = resp.userId === Number(userId)
	ReactDOM.render(
		<WishList 
			name={resp.userName} editable={editable} wishlist={resp.list}
			saveWish={(wishDetails, onSuccessCallback) => saveWish(wishDetails, onSuccessCallback)}
			deleteWish={(wishDetails) => deleteWish(wishDetails)}
		/>, 
		document.getElementById('main-content'))
})

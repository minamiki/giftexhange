'use strict'
import 'bootstrap'
import 'font-awesome/scss/font-awesome.scss'
import './scss/index.scss'
import './scss/wishlist.scss'
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
const deleteWish = (wishId, onSuccessCallback) => {
	$.ajax({
		url: `${itemUrl}/${wishId}`,
		method: 'DELETE'
	}).done(() => {
		onSuccessCallback()
	})
}

const refreshList = (onSuccessCallback) => {
	$.get(url, (resp) => {
		onSuccessCallback(resp.list)
	})
}

// TODO: fetch user info & wishlist
$.get(url, (resp) => {
	const editable = resp.userId === Number(userId)
	ReactDOM.render(
		<WishList 
			name={resp.userName} editable={editable} wishlist={resp.list}
			refreshList={(onSuccessCallback) => refreshList(onSuccessCallback)}
			saveWish={(wishDetails, onSuccessCallback) => saveWish(wishDetails, onSuccessCallback)}
			deleteWish={(wishId, onSuccessCallback) => deleteWish(wishId, onSuccessCallback)}
		/>, 
		document.getElementById('main-content'))
})

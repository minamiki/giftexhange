'use strict'
import 'bootstrap'
import './scss/index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import WishList from './components/WishList'

const searchParams = new URLSearchParams(window.location.search); //?anything=123
const id = searchParams.get('id')

// TODO: fetch user info & wishlist
$.get(`/api/wishlist/${id}`, (data) => {
	ReactDOM.render(<WishList name={data.userName} editable={true} wishlist={data.list}/>, document.getElementById('main-content'))
})

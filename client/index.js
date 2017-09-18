import 'bootstrap'
import './scss/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import WishListCard from './components/WishListCard'

class WishList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			wishlist: [{
				id: 1,
				name: 'ipad',
				description: 'ipad of any generation as long as it is in good working condition',
				urlLink: 'http://www.ipad.com'
			}, {
				id: 2,
				name: 'Google Pixel2',
				description: 'Preferably pixel 2, otherwise pixel 1 is fine as well'
			}]
		}
	}
	componentDidMount() {
		window.test = this
	}
	render() {
		const wishlist = this.state.wishlist.slice()
		const slicedWishlist = []
		const size = 3
		while (wishlist.length) {
			slicedWishlist.push(wishlist.splice(0, size))
		}

		return (
		<form className="form-horizontal">
			<h3>Wish List</h3>
			<div className="container-fluid">
				<div className="row">
				{slicedWishlist.map(function(rowWishlist) {
					return (
						rowWishlist.map(function(item) {
							return (
								<div key={item.id} className="col-xs-12 col-md-4">
									<WishListCard key={item.id} {...item}>
									</WishListCard>
								</div>
							)
						})
					)
				})}
				</div>
			</div>
		</form>
		)
	}
}


ReactDOM.render(<WishList/>, document.getElementById('main-content'))

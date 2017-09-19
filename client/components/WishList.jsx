import React from 'react'
import WishListCard from './WishListCard'

export default class WishList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			wishlist: this.props.wishlist || []
		}
	}
	saveWish(wishDetails) {
		// TODO: save
		if (wishDetails.id) {
			const wishItem = this.state.wishlist.find((item) => {
				return item.id === wishDetails.id
			})
			Object.assign(wishItem, wishDetails)
		} else {
			wishDetails.id = this.state.wishlist.length + 1
			this.state.wishlist.push(wishDetails)
		}
		this.setState({
			wishlist: this.state.wishlist
		})
	}
	render() {
		const wishlist = this.state.wishlist.slice()
		if (this.props.editable) {
			wishlist.push({
				id: 'new'
			})
		}
		const slicedWishlist = []
		const size = 3
		while (wishlist.length) {
			slicedWishlist.push(wishlist.splice(0, size))
		}

		return (
		<div className="container-fluid">
			<div className="header row">
				<div className="col-xs-12 col-md-12">
					<h3>Wish List</h3>
				</div>
			</div>
			<div>
				{slicedWishlist.map((rowWishlist, index) => {
					return (
						<div key={index} className="row">
						{rowWishlist.map((item) => {
							return (
								<div key={item.id} className="col-xs-12 col-md-4">
									<WishListCard editable={this.props.editable} key={item.id} saveWish={(wishDetails) => this.saveWish(wishDetails)} {...item}>
									</WishListCard>
								</div>
							)
						})}
						</div>
					)
				})}
			</div>
		</div>
		)
	}
}
import React from 'react'
import WishListCard from './WishListCard'

export default class WishList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			wishlist: this.props.wishlist || []
		}
	}
	refreshList() {
		this.props.refreshList((wishlist) => {
			this.setState({
				wishlist: wishlist
			})
		})
	}
	saveWish(wishDetails) {
		this.props.saveWish(wishDetails, (resultWishDetails) => {
			const wishItem = this.state.wishlist.find((item) => {
				return item.id === wishDetails.id
			})
			if (wishItem) {
				Object.assign(wishItem, resultWishDetails)	
			} else {
				this.state.wishlist.push(resultWishDetails)
			}
			this.setState({
				wishlist: this.state.wishlist
			})
		})
	}
	deleteWish(wishId) {
		if (!window.confirm('Are you sure you want to remove this wish?')) {
			return
		}
		this.props.deleteWish(wishId, () => {
			const index = this.state.wishlist.findIndex((item) => {
				return item.id === wishId
			})
			this.state.wishlist.splice(index, 1)
			this.setState({
				wishlist: this.state.wishlist
			})
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
		const wishlistDisplay = slicedWishlist.length
			? slicedWishlist.map((rowWishlist, index) => {
					return (
						<div key={index} className="row">
						{rowWishlist.map((item) => {
							return (
								<div key={item.id} className="col-xs-12 col-md-4">
									<WishListCard 
										editable={this.props.editable} key={item.id} 
										saveWish={(wishDetails) => this.saveWish(wishDetails)} 
										deleteWish={(wishId) => this.deleteWish(wishId)}
										{...item}
									>
									</WishListCard>
								</div>
							)
						})}
						</div>
					)
				})
			: <div>Waiting for {this.props.name} to make a wish!</div>
		
		return (
		<div className="container-fluid">
			<div className="header row">
				<div className="col-xs-12 col-md-12">
					<h3>
						{this.props.name}'s Wish List
						<a onClick={() => this.refreshList()}>
							<i className="fa fa-refresh" aria-hidden="true"></i>
						</a>
					</h3>
				</div>
			</div>
			<div>
				{wishlistDisplay}
			</div>
		</div>
		)
	}
}
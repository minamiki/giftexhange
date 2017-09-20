import React from 'react'
import WishListCardDisplay from './WishListCardDisplay'
import WishListCardForm from './WishListCardForm'
import WishListCardNew from './WishListCardNew'

export default class WishListCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			new: this.props.id === 'new',
			edit: false
		}
	}
	componentDidMount() {
		window.card = window.card || {}
		window.card[this.props.id] = this
	}
	saveWish(wishDetails) {
		this.props.saveWish(wishDetails)
	}
	deleteWish() {
		this.props.deleteWish(this.props.id)
	}
	showDisplay() {
		this.setState({
			edit: false
		})
	}
	showForm() {
		this.setState({
			edit: true
		})
	}
	render() {
		if (this.state.edit) {
			return <WishListCardForm 
				saveWish={(wishDetails) => this.saveWish(wishDetails)} 
				deleteWish={() => this.deleteWish()}
				showDisplay={() => this.showDisplay()} 
				{...this.props}
			/>
		} else if (this.state.new) {
			return <WishListCardNew 
				onWish={() => this.showForm()} 
				{...this.props}
			/>
		} else {
			return <WishListCardDisplay 
				deleteWish={() => this.deleteWish()}
				showForm={() => this.showForm()}
				{...this.props}/>
		}
	}
}

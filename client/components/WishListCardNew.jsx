import React from 'react'

export default class WishListCardDisplay extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="card card-empty w-100" onClick={this.props.onWish}>
				<div className="card-body">
					Make a Wish!
				</div>
			</div>
		)
	}
}

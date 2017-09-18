import React from 'react'

export default class WishListCard extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let image = null;
		let linkButton = null;
		if (this.props.imageLink) {
			image = <img className="card-img" src={this.props.imageLink} alt=""/>
		}
		if (this.props.urlLink) {
			linkButton = <a className="btn btn-primary card-url" target="_blank" href="this.props.urlLink">Check it out!</a>
		}

		return (
			<div className="card w-100">
				{image}
				<div className="card-body">
					<h4 className="card-name">{this.props.name}</h4>
					<p className="card-description">{this.props.description}</p>
					{linkButton}
				</div>
			</div>
		)
	}
}

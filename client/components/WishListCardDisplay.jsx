import React from 'react'

export default class WishListCardDisplay extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let image = null
		let linkButton = null
		let iconOverlay = null
		let onDoubleClick = null
		if (this.props.imageLink) {
			image = <img className="card-img" src={this.props.imageLink} />
		}
		if (this.props.urlLink) {
			linkButton = <a className="btn btn-primary card-url" target="_blank" href={this.props.urlLink}>Check it out!</a>
		}
		if (this.props.editable) {
			onDoubleClick = () => this.props.showForm()
			iconOverlay = (
				<div className="card-icon-overlay">
					<a onClick={onDoubleClick}>
						<i className="fa fa-pencil-square-o" aria-hidden="true"></i>
					</a>
					<a onClick={() => this.props.deleteWish()}>
						<i className="fa fa-trash-o" aria-hidden="true"></i>
					</a>
				</div>
			)
		}

		return (
			<div className="card w-100" onDoubleClick={onDoubleClick}>
				{iconOverlay}
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

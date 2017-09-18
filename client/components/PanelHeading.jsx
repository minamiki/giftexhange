import React from 'react'
import BaseComponent from './BaseComponent'

export default class PanelHeading extends BaseComponent {
	constructor(props) {
		super(props)
		this.defaultClassName = 'panel-heading'
	}
	
	render() {
		return (
			<div {...this.props} className={this.buildClassName()}>
				{this.props.children}
			</div>
		)
	}
}

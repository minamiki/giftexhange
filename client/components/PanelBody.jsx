import React from 'react'
import BaseComponent from './BaseComponent'

export default class PanelBody extends BaseComponent {
	constructor(props) {
		super(props)
		this.defaultClassName = 'panel-body'
	}
	
	render() {
		return (
			<div {...this.props} className={this.buildClassName()}>
				{this.props.children}
			</div>
		)
	}
}

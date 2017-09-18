import React from 'react'
import BaseComponent from './BaseComponent'

export default class Panel extends BaseComponent {
	constructor(props) {
		super(props)
		
		this.defaultClassName = 'panel panel-default'
	}
	render() {
		return(
			<div {...this.props} className={this.buildClassName()}>
				{this.props.children}
			</div>
		)
	}
}

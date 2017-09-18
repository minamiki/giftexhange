import React from 'react'
import BaseComponent from './BaseComponent'

export default class FormGroup extends BaseComponent {
	constructor(props) {
		super(props)

		this.defaultClassName = 'form-group'
	}
	render() {
		return(
			<div className={this.buildClassName()}>
				{this.props.children}
			</div>
		)
	}
}

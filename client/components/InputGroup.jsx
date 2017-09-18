import React from 'react'
import BaseComponent from './BaseComponent'

export default class InputGroup extends BaseComponent {
	constructor(props) {
		super(props)
		this.defaultWrapperClassName = 'input-group'
		this.defaultClassName = 'input-group-addon'
	}
	buildAddOn(child) {
		return(
			<span className={this.buildClassName()}>
				{child}
			</span>
		)
	}
	getBefore() {
		if(this.props.before) {
			return this.buildAddOn(this.props.before)
		}
		return null
	}
	getAfter() {
		if(this.props.after) {
			return this.buildAddOn(this.props.after)
		}
		return null
	}
	render() {
		return(
			<div className={this.buildWrapperClassName()}>
				{this.getBefore()}
				{this.props.children}
				{this.getAfter()}
			</div>
		)	
	}
}


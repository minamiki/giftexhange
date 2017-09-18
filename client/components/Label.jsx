import React from 'react'
import BaseField from './BaseField'

export default class Label extends BaseField {
	constructor(props) {
		super(props)
			
		this.defaultColumn = 'col-xs-4'
		this.defaultClassName = 'control-label'
	}
	
	buildClassName() {
		let className = `${this.setColumn()} ${this.defaultClassName}`
		if(this.props.className) {
			className = `${className} ${this.props.className}`
		}
		return className
	}

	render() {
		return(
			<label className={this.buildClassName()}>
				{this.props.children}
			</label>
		)
	}
}

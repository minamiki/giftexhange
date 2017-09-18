import React from 'react'

export default class BaseComponent extends React.Component {
	constructor(props) {
		super(props)
		
		this.defaultWrapperClassName = ''
		this.defaultClassName = ''
		this.defaultColumn = ''
	}

	setColumn() {
		return this.props.column || this.defaultColumn
	}

	buildWrapperClassName() {
		let className = this.defaultWrapperClassName || ''
		if(this.props.wrapperClassName) {
			className = `${className} ${this.props.wrapperClassName}`
		}
		return className
	}

	buildClassName() {
		let className = this.defaultClassName || ''
		
		if(this.props.className) {
			className = `${className} ${this.props.className}`
		}
		
		return className
	}
}

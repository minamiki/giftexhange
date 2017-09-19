import React from 'react'
import BaseComponent from './BaseComponent'

export default class BaseField extends BaseComponent {
	constructor(props) {
		super(props)
		this.defaultClassName = 'form-control'
		this.defaultColumn = 'col-xs-8'		
		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.state = {value: null}
	}

	buildClassName() {
		let className = this.defaultClassName
		if(this.props.className) {
			className = `${className} ${this.props.className}`
		}
		if(this.props.disabled) {
			className = `${className} disabled`
		}
		return className
	}

	handleChange(e) {
		this.setState({value: e.target.value})
		if(this.props.handleChange && typeof this.props.handleChange === 'function') {
			console.log('calling', e)
			this.props.handleChange.call(e, this)
		}
	}

	handleClick(e) {
		if(this.props.handleClick) {
			this.props.handleClick.call(e, this)
		}
	}

	getValue() {
		return null
	}
}

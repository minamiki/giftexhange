import React from 'react'
import BaseComponent from './BaseComponent'

export default class Form extends BaseComponent {
	constructor(props) {
		super(props)
		this.defaultClassName = 'form-horizontal'
	}

	loadData() {
		const _this = this
		fetch(this.props.dataUrl)
			.then((response) => {
				this.setState(response)
			})
	}


	handleChange(e) {
		const pathStr = e.target.dataset.path
		const value = e.target.value

		let paths = pathStr.split('.')
		
		if(paths.length > 1) {
								
		}
	}

	render() {
		return (
			<form>
				{this.props.children}
			</form>
		)
	}
}

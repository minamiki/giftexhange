import React from 'react'
import BaseField from './BaseField'

export default class Input extends BaseField {
	constructor(props) {
		super(props)
		this.defaultClassName = 'form-control'

		this.fieldProps = {
			"data-path": this.props.path,
			"onChange": this.handleChange,
			"defaultValue": this.props.value,
			"name": this.props.path,
			"id": this.props.id,
			"className": this.buildClassName(),
			"required": this.props.required
		}
	}

	getValue() {
		return this.el.value
	}

	render() {
		return (
			<div className={this.setColumn()}>
				<textarea 
					ref={(el) => { this.el = el }}
					rows="3" {...this.fieldProps}></textarea>
			</div>
		)
	}
}
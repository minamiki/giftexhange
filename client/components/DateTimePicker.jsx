import React from 'react'
import BaseField from './BaseField'
import DateTimeField from 'react-bootstrap-datetimepicker'

export default class DateTimePicker extends BaseField {
	constructor(props) {
		super(props)
		
		this.defaultClassName = 'react-boostrap-datetimepicker'
	}

	buildWrapperClassName() {
		let className = `${this.setColumn()} ${this.defaultWrapperClassName}`
		if(this.props.wrapperClassName) {
			className= `${className} ${this.props.wrapperClassName}`
		}
		return className
	}

	render() {
		return(
			<div className={this.buildWrapperClassName()}>
				<DateTimeField mode={this.props.mode} inputFormat={this.props.inputFormat} className={this.buildClassName} onChange={this.handleOnChange}/>
			</div>
		)
	}
}

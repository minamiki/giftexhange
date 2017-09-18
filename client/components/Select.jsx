import React from 'react'
import BaseField from './BaseField'

export default class Select extends BaseField {
	constructor(props) {
		super(props)
		this.defaultClasSName = 'form-control'
		this.defaultOptionSize = 20
	}
	buildWrapperClassName() {
		let className = `${this.setColumn()} ${this.defaultWrapperClassName}`
		if(this.props.wrapperClassName) {
			className = `${className} ${this.props.wrapperClassName}`
		}
		return className
	}
	getOptions() {
		let options = []
		if(this.props.options) {
			this.props.options.forEach((option) => {
				options.push(<option value={option.value} key={option.value}>{option.value}</option>)
			})
		}

		return options
	}
	buildSelect2Options() {
		let _this = this
		let options = {
			tags: this.props.tags || false,		
		}

		if(this.props.optionsUrl) {
			options.ajax = {
				url: this.props.optionsUrl,
				dataType: 'json'
			}
			
			options.ajax.data = (params) => {
				let query = {
					start: params.page || 0,
					length: _this.props.optionSize || this.defaultOptionSize
				}
				if(_this.props.searchParam) {
					query[_this.props.searchParam] = params.term
				}
				return query
			}
			options.processResults = (response) =>{

			}
		}
		return options

	}
	componentDidMount() {
//		$(this.refs.select).select2(this.buildSelect2Options()).on('change', this.handleOnChange)
	}
	render() {
		return (
			<div className={this.buildWrapperClassName()}>
				<select className={this.buildClassName()} name={this.props.name} data-path={this.props.path} ref="select">
					{this.getOptions()}
				</select>
			</div>
		)
	}
}

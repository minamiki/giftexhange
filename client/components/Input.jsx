import React from 'react'
import BaseField from './BaseField'

export default class Input extends BaseField {
	constructor(props) {
		super(props)
		
		if(this.props.type === 'text' || this.props.type === 'hidden') {
			this.defaultClassName = 'form-control'
		}  else {
			this.defaultClassName = ''
		}

		this.fieldProps = {
			"data-path": this.props.path,
			"onChange": this.handleChange,
			"defaultValue": this.props.value,
			"name": this.props.path,
			"id": this.props.id,
			"className": this.buildClassName()
		}
	}
	
	buildAddOn(child) {
		return (<span className="input-group-addon">{child}</span>)
	}

	getBefore() {
		if(this.props.before) {
			return this.buildAddOn(this.props.before)
		}
	}
	
	getAfter() {
		if(this.props.after) {
			return this.buildAddOn(this.props.after)
		}
	}

	getChildren() {
		if(this.props.type === 'radio') {
			let radios = []
			this.props.options.forEach((option, index) => {
				radios.push (
					<label key={option.value}>
						<input type='radio' {...this.fieldProps} key={option.value}/>
						{option.text}
					</label>
				)
				
			})
			return (
				<div className="radio">
					{radios}
				</div>
			)
		} else if(this.props.type === 'checkbox') {
			return (<div className="checkbox">
				<label>
					<input type='checkbox' {...this.fieldProps}/>
					{this.props.text}
				</label>
			</div>)
		} else {
			if(this.props.type === 'text' && (this.props.after || this.props.before))
			{
				return (
					<div className="input-group">
						{this.getBefore()}
						<input type="text" {...this.fieldProps} />
						{this.getAfter()}
					</div>
				)
			}
			else {
				return (<input type={this.props.type} {...this.fieldProps}/>)
			}
		}
	}

	render() {
		return (
			<div className={this.setColumn()}>
			{this.getChildren()}
			</div>
		)
	}
}



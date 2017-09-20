import React from 'react'
import Form from './Form'
import FormGroup from './FormGroup'
import Label from './Label'
import Input from './Input'
import TextArea from './TextArea'

export default class WishListCardForm extends React.Component {
	constructor(props) {
		super(props)
		this.input = {}
	}
	onSubmit(ev) {
		ev.preventDefault()
		
		const wishDetails = {
			name: this.input.name.getValue(),
			description: this.input.description.getValue(),
			urlLink: this.input.urlLink.getValue(),
			imageLink: this.input.imageLink.getValue()
		}
		if (this.props.id !== 'new') {
			wishDetails.id = this.props.id
		}
		this.props.save(wishDetails)
		this.props.showDisplay()
	}
	render() {
		return (
			<div className="card w-100">
				<div className="card-body">
					<Form onSubmit={(ev) => this.onSubmit(ev)}>
						<FormGroup className="input">
							<Label>Name</Label>
							<Input 
								ref={(input) => { this.input.name = input }}
								type="text" value={this.props.name} required="true"/>
						</FormGroup>
						<FormGroup className="input">
							<Label>Description</Label>
							<TextArea 
								ref={(input) => { this.input.description = input }}
								value={this.props.description}/>
						</FormGroup>
						<FormGroup className="input">
							<Label>Url</Label>
							<Input 
								ref={(input) => { this.input.urlLink = input }}
								type="text" value={this.props.urlLink}/>
						</FormGroup>
						<FormGroup className="input">
							<Label>Image Link</Label>
							<Input 
								ref={(input) => { this.input.imageLink = input }}
								type="text" value={this.props.imageLink}/>
						</FormGroup>
						<button type="submit" className="btn btn-primary">Save</button>
						<button type="button" className="btn btn-primary" onClick={this.props.showDisplay}>Cancel</button>
					</Form>
				</div>
			</div>
		)
	}
}

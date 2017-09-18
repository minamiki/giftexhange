import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Input from './components/Input'
import Label from './components/Label'
import InputGroup from './components/InputGroup'
import FormGroup from './components/FormGroup'
import Panel from './components/Panel'
import PanelHeading from './components/PanelHeading'
import PanelBody from './components/PanelBody'
import DateTimePicker from './components/DateTimePicker'
import Select from './components/Select'

class DemoForm extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			input: '',
			radio: '',
			checkbox: '',
			date: ''
		}
		window.state = this.state
		this.handleChange = this.handleChange.bind(this)
	}	
	handleChange(e, child) {
		console.log('change', e, child)
	}
	render() {
		let options = [
			{value: 1, text: "First"},
			{value: 2, text: "Second"},
			{value: 3, text: "Third"}	
		]
		return(
		<form className="form-horizontal">
			<Panel className="panel-react" role="tab">
				<PanelHeading className="collapsible" data-toggle="collapse" href="#collapsible">		
					<h3>This is Panel Heading</h3>
				</PanelHeading>
				<PanelBody id="collapsible">
				<FormGroup className="input">
					<Label>Input Text with AddOn</Label>
					<Input type="text" path="inputGroup" value="123" after="%" before="S$" handleChange={this.handleChange}/>
				</FormGroup>
				<FormGroup className="input">
					<Label>Input Radio</Label>
					<Input type="radio" path="radio" options={options} after="$" before="%" handleChange={this.handleChange}/>
				</FormGroup>
				<FormGroup className="input">
					<Label>Input Radio</Label>
					<Input type="checkbox" path="checkbox" value="123" label="12" text="Ab"  options={options} after="$" before="%" pathRef={this.state.checkbox} handleChange={this.handleChange}/>
				</FormGroup>
				<FormGroup className="datetimepicker">
					<Label>DateTimePicker</Label>
					<DateTimePicker mode="time" inputFormat="HH:mm:ss" className="time-field" column="col-xs-4"/>
					<DateTimePicker mode="date" inputFormat="MM/DD/YYYY" className="date-field" column="col-xs-4"/>
				</FormGroup>	
				<FormGroup>
					<Label>Select</Label>
					<Select/>
				</FormGroup>
				</PanelBody>
			</Panel>
		</form>
		)
	}
}


ReactDOM.render(<DemoForm/>,document.getElementById('root'))

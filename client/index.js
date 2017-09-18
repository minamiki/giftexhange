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

class DemoForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			wishlist: ["item 1", "item 2"]
		}
		window.state = this.state
		this.handleChange = this.handleChange.bind(this)
	}	
	handleChange(e, child) {
		console.log('change', e, child)
	}
	render() {
		return (
		<form className="form-horizontal">
			<Panel className="panel-react" role="tab">
				<PanelHeading className="collapsible" data-toggle="collapse" href="#collapsible">		
					<h3>Wish List</h3>
				</PanelHeading>
				<PanelBody id="collapsible">
				{this.state.wishlist.map(function(item, index) {
					return (
					<FormGroup className="input">
						<Label>{index + 1}</Label>
						<Input type="text" path="inputGroup" value={item}/>
					</FormGroup>
					)
				})}
				</PanelBody>
			</Panel>
		</form>
		)
	}
}


ReactDOM.render(<DemoForm/>,document.getElementById('root'))

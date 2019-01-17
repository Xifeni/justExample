import {Component} from "react";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import React from "react";

class FormItem extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            label: '',
            value: '',
            placeholder: '',
            visibleHelpBlock: false,
            textHelpBlock: ''
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    render() {
        return (
            <form>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.props.validateFunc(this.state.value.length)}>
                    <ControlLabel>{this.state.label}</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder={this.state.placeholder}
                        onChange={this.handleChange}/>
                    <FormControl.Feedback/>
                    {this.state.visibleHelpBlock && <HelpBlock>{this.state.textHelpBlock}</HelpBlock>}
                </FormGroup>
            </form>
        );
    }
}

export default FormItem
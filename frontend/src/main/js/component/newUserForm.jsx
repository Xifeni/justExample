import {Component} from "react";
import {Button, Checkbox, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
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
            <FormGroup
                controlId={this.props.id}
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
        );
    }
}

class FormCheckBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup>
                <Checkbox inputRef={ref => this.input = ref}>Manager</Checkbox>
            </FormGroup>
        )
    }
}

class FormList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form>
                {this.props.formItems.map(item =>
                    <FormItem>
                        id={item.id}
                        validationFunc={item.validationFunc}}
                    </FormItem>
                )}
                <FormCheckBox/>
                <Button>Submit</Button>
                <Button>Cancel</Button>
            </form>)
    }
}

export default FormList
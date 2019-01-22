import {Button, Checkbox, ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from "react-bootstrap";
import React from "react";

class FormItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
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
                controlId={this.props.key}
                validationState={this.props.validate(this.state.value.length)}>
                <ControlLabel>{this.props.name}</ControlLabel>
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

class FormCheckBox extends React.Component {
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

export default class FormList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        {this.props.items.map(item =>
                            <FormItem key={item.id}
                                      name={item.label}
                                      validate={item.validateFunc}/>
                        )}
                        <FormCheckBox/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.setActiveArea("MAIN")}>Close</Button>
                    <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>)
    }
};
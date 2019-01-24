import {Button, Checkbox, ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from "react-bootstrap";
import React from "react";
import {USER_LIST} from "../container/const.js";
import {connect} from "react-redux";

class FormItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: '',
            textHelpBlock: this.props.helpText,
            validationState: null,
            ref: null
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value, validationState: this.props.validate(this.state.value)});
        this.props.sendParam(this.state.ref);
    }

    render() {
        return (
            <FormGroup
                key={this.props.key}
                validationState={this.state.validationState}>
                <ControlLabel>{this.props.name}</ControlLabel>
                <FormControl
                    id={this.props.name}
                    type={(this.props.type === null && "text") || this.props.type}
                    value={this.state.value}
                    onChange={this.handleChange}
                    inputRef={ref => this.state.ref = ref}/>
                <HelpBlock>{(this.state.validationState === 'error' && this.state.textHelpBlock)}</HelpBlock>
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

class FormList extends React.Component {
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
                                      validate={item.validateFunc}
                                      helpText={item.helpText}
                                      sendParam={item.sendParam}/>
                        )}
                        <FormCheckBox/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.setActiveArea(USER_LIST)}>Close</Button>
                    <Button bsStyle="primary" disabled={this.props.hasError === true}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>)
    }
};

function mapStateToProps(state) {
    return {
        hasError: state.hasError,
        user: state.user,
        username: state.username,
        firstname: state.firstname,
        lastname: state.lastname,
        password: state.password

    };
}

export default connect(mapStateToProps)(FormList);
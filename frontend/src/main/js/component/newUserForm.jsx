import {Button, Checkbox, ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from "react-bootstrap";
import React from "react";
import {USER_LIST} from "../container/const.js";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {simpleValidation} from "../actions/actions.jsx";

class FormItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: '',
            textHelpBlock: this.props.helpText,
            validationState: null
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value, validationState: this.props.validate(this.state.value)});
    }

    render() {
        return (
            <FormGroup
                key={this.props.key}
                validationState={this.state.validationState}>
                <ControlLabel>{this.props.name}</ControlLabel>
                <FormControl
                    type={(this.props.type === null && "text") || this.props.type}
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <HelpBlock>{(this.state.validationState === 'error' && this.state.textHelpBlock)}</HelpBlock>
            </FormGroup>
        );
    }
}

/*class FormPasswordItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: '',
            textHelpBlock: this.props.helpText,
            validationState: null
        };
    }

    handleChange(e) {
        this.setState({value: e.target.value, validationState: this.props.validate(this.state.value)});
    }

    render() {
        return (
            <FormGroup
                controlId={this.props.key}
                validationState={this.state.validationState}>
                <ControlLabel>{this.props.name}</ControlLabel>
                <FormControl
                    type="password"
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <HelpBlock>{(this.state.validationState === 'error' && this.state.textHelpBlock)}</HelpBlock>
                <FormControl
                    type="password"
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <HelpBlock>{(this.state.validationState === 'error' && this.state.textHelpBlock)}</HelpBlock>
            </FormGroup>
        );
    }
}*/

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
                                      helpText={item.helpText}/>
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
        hasError: state.hasError
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        setError: bindActionCreators(simpleValidation, dispatch)
    }
})(FormList);
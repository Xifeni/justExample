import {Button, Checkbox, ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from "react-bootstrap";
import React from "react";
import {USER_LIST, HAS_ERROR} from "../container/const.js";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendForm, clearErrorStatus} from "../actions/actions.jsx";

class FormItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.blur = this.blur.bind(this);

        this.state = {
            textHelpBlock: this.props.helpText,
            validationState: null,
            value: this.props.value
        };
    }

    //todo:Две валидации! Подумать как оставить одну.
    handleChange(e) {
        this.setState({
            value: e.target.value,
            validationState: this.props.validate({id: this.props.name, value: e.target.value})
        });
    }

    blur() {
        this.setState({
            validationState: this.props.validate({id: this.props.name, value: this.state.value})
        });
        this.props.sendParam({id: this.props.name, value: this.state.value});
    }

    render() {
        return (
            <FormGroup
                key={this.props.key}
                validationState={this.state.validationState}>
                <ControlLabel>{this.props.name}</ControlLabel>
                <FormControl
                    id={this.props.name}
                    type={(this.props.type)}
                    value={this.state.value}
                    onChange={this.handleChange}
                    onBlur={this.blur}/>
                <HelpBlock>{(this.state.validationState === 'error' && this.state.textHelpBlock)}</HelpBlock>
            </FormGroup>
        );
    }

    componentDidMount() {
        this.blur();
    }
}

class FormCheckBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormGroup>
                <Checkbox>Manager</Checkbox>
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
                                      type={item.type}
                                      helpText={item.helpText}
                                      sendParam={item.sendParam}
                                      value={this.props.presetUser[item.id]}/>
                        )}
                        <FormCheckBox/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <HelpBlock>{(this.props.checkPassword(this.props.newUser) === 'error' &&
                        "Password and retype password is not equals")}</HelpBlock>
                    <Button onClick={() => {
                        this.props.setActiveArea(USER_LIST);
                        this.props.clearErrorStatus();
                    }}>Close</Button>
                    <Button bsStyle="primary" disabled={this.props.errorStatus}
                            onClick={
                                () => this.props.sendForm(this.props.newUser)
                            }>Save</Button>
                </Modal.Footer>
            </Modal.Dialog>)
    }
};

function mapStateToProps(state) {
    return {
        errorStatus: state.errorStatus[HAS_ERROR],
        newUser: state.newUser,
        presetUser: state.presetUser
    };
}

export default connect(mapStateToProps, (dispatch) => {
        return {
            clearErrorStatus: bindActionCreators(clearErrorStatus, dispatch),
            sendForm: bindActionCreators(sendForm, dispatch)
        }
    }
)(FormList);
import {Button, Checkbox, ControlLabel, FormControl, FormGroup, HelpBlock, Modal} from "react-bootstrap";
import React from "react";
import {
    USER_LIST,
    HAS_ERROR,
    ERROR,
    NOT_ADMIN,
    ADMIN,
    LANG_WARN,
    MESSAGE,
} from "../container/const.js";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    sendForm,
    clearErrorStatus,
    setActiveArea,
    passwordValidation,
    simpleValidation,
    sendParam
} from "../actions/actions.jsx";

class FormItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.blur = this.blur.bind(this);

        this.state = {
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
                <HelpBlock>{(this.state.validationState === ERROR && this.props.helpText)}</HelpBlock>
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
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let role = e.target.checked ? ADMIN : NOT_ADMIN;
        this.props.sendParam({id: ADMIN, value: role});
    }

    render() {
        return (
            <FormGroup>
                <Checkbox onChange={this.handleChange}>Manager</Checkbox>
            </FormGroup>
        )
    }
}

class FormList extends React.Component {
    constructor(props) {
        super(props);
    }

    //todo: не тратить больше время, спросить про валидацию.
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
                                      validate={this.props.validateFunc}
                                      type={item.type}
                                      helpText={[LANG_WARN]}
                                      sendParam={this.props.sendParam}
                                      value={this.props.presetUser[item.id]}/>
                        )}
                        <FormCheckBox sendParam={this.props.sendParam}/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <HelpBlock>{this.props.passwordError && MESSAGE}</HelpBlock>
                    <Button onClick={() => {
                        this.props.setActiveArea(USER_LIST);
                        this.props.clearErrorStatus();
                    }}>Close</Button>
                    <Button bsStyle="primary" disabled={this.props.errorStatus}
                            onClick={() => {
                                this.props.checkPassword(this.props.newUser);
                                if (!(this.props.errorStatus)) {
                                    this.props.sendForm(this.props.newUser, this.props.signatureUser)
                                }
                            }}>Save</Button>
                </Modal.Footer>
            </Modal.Dialog>)
    }
};

function mapStateToProps(state) {
    return {
        errorStatus: state.errorStatus[HAS_ERROR],
        newUser: state.newUser,
        presetUser: state.presetUser,
        passwordError: state.passwordErrorStatus[HAS_ERROR],
        signatureUser: state.signatureUser
    };
}

export default connect(mapStateToProps, (dispatch) => {
        return {
            clearErrorStatus: bindActionCreators(clearErrorStatus, dispatch),
            sendForm: bindActionCreators(sendForm, dispatch),
            setActiveArea: bindActionCreators(setActiveArea, dispatch),
            checkPassword: bindActionCreators(passwordValidation, dispatch),
            validateFunc: bindActionCreators(simpleValidation, dispatch),
            sendParam: bindActionCreators(sendParam, dispatch)
        }
    }
)(FormList);
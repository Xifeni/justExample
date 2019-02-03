import {Button, HelpBlock, Modal} from "react-bootstrap";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setActiveArea} from "../../actions/actions.jsx";

import FormItem from "../component/label.js";
import FormCheckBox from "../component/checkBox";
import {wipeData, sendForm} from "../createNewUserActions";
import {PASSWORD_ERROR_MESSAGE, VALIDATION_STATUS, PASSWORD_STATUS, USER_LIST} from "../../const.js";
import {USER_SIGNATURE, USERNAME} from "../../const";

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
                                      type={item.type}
                                      value={this.props.newUser[item.id].value}/>
                        )}
                        <FormCheckBox/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <HelpBlock>{!this.props.passStatus && PASSWORD_ERROR_MESSAGE}</HelpBlock>
                    <Button onClick={() => {
                        this.props.setActiveArea(USER_LIST);
                        this.props.clearErrorStatus();
                    }}>Close</Button>
                    <Button bsStyle="primary"
                            disabled={checkValidationState(this.props.signature, this.props.passStatus, this.props.validStatus)}
                            onClick={() => {
                                this.props.sendForm(this.props.newUser, this.props.signature, this.props.currentUser);
                            }}>Save</Button>
                </Modal.Footer>
            </Modal.Dialog>)
    }
}


function checkValidationState(signature, passStatus, validStatus) {
    if (signature.length !== 0 && passStatus !== false && validStatus === null) {
        return false;
     }
    if (signature.length === 0 && passStatus === null && validStatus === null) {
        return true;
    }
    return !(passStatus && validStatus);
}

function mapStateToProps(state) {
    return {
        newUser: state.createUserReducer.newUser,
        passStatus: state.createUserReducer[PASSWORD_STATUS],
        validStatus: state.createUserReducer[VALIDATION_STATUS],
        signature: state.createUserReducer[USER_SIGNATURE],
        currentUser:state.generalReducer.currentUser[USERNAME]
    };
}

export default connect(mapStateToProps, (dispatch) => {
        return {
            clearErrorStatus: bindActionCreators(wipeData, dispatch),
            sendForm: bindActionCreators(sendForm, dispatch),
            setActiveArea: bindActionCreators(setActiveArea, dispatch)
        }
    }
)(FormList);
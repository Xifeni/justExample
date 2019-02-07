import {Button, HelpBlock, Modal} from "react-bootstrap";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setActiveArea} from "../root/actions";

import FormItem from "./fromItem.jsx";
import FormCheckBox from "./checkBox.jsx";
import {wipeData, sendForm, addError} from "./actions";
import {
    PASSWORD,
    PASSWORD_ERROR_MESSAGE,
    RETRY_PASSWORD,
    USER_LIST,
    USER_SIGNATURE,
    USERNAME
} from "../../const";


class FormList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditingUser: props.newUser[USERNAME].value !== ""
        }
    }

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>{(this.state.isEditingUser && "Edit user") || "Create user"}</Modal.Title>
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
                    <HelpBlock>{checkPassword(this.props.newUser) && PASSWORD_ERROR_MESSAGE}</HelpBlock>
                    <Button onClick={() => {
                        this.props.setActiveArea(USER_LIST);
                        this.props.clearErrorStatus();
                    }}>Close</Button>
                    <Button bsStyle="primary"
                            disabled={checkValidationState(this.props.signature, this.props.newUser)}
                            onClick={() => {
                                this.props.sendForm(this.props.newUser, this.props.signature, this.props.currentUser);
                            }}>Save</Button>
                </Modal.Footer>
            </Modal.Dialog>)
    }
}

function checkValidationState(signature, newUser) {
    for (let param in newUser) {
        if (newUser[param].error.length !== 0) {
            return true;
        }
    }
    return false;
}

function checkPassword(newUser) {
    return newUser[PASSWORD].value !== newUser[RETRY_PASSWORD].value;
}


function mapStateToProps(state) {
    return {
        newUser: state.createUserReducer.newUser,
        signature: state.createUserReducer[USER_SIGNATURE],
        currentUser: state.generalReducer.currentUser[USERNAME]
    };
}

export default connect(mapStateToProps, (dispatch) => {
        return {
            clearErrorStatus: bindActionCreators(wipeData, dispatch),
            sendForm: bindActionCreators(sendForm, dispatch),
            setActiveArea: bindActionCreators(setActiveArea, dispatch),
            addError: bindActionCreators(addError, dispatch)
        }
    }
)(FormList);
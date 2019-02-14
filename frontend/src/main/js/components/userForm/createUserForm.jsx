import {Button, HelpBlock, Modal} from "react-bootstrap";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setActiveArea} from "../root/actions";

import FormItem from "./fromItem.jsx";
import FormCheckBox from "./checkBox.jsx";
import {wipeData, saveNewUser, saveEditedUser, addError} from "./actions";
import {
    PASSWORD,
    PASSWORD_ERROR_MESSAGE,
    RETRY_PASSWORD,
    USER_LIST,
    OLD_EDITABLE_USERNAME,
    USERNAME, FIRST_NAME, LAST_NAME
} from "../../const";

class FormList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditingUser: props.newUser[USERNAME].value !== "",
            items: [
                {
                    id: [USERNAME],
                    label: 'Username',
                    type: 'text',
                },
                {
                    id: [PASSWORD],
                    label: 'Password',
                    type: "password",
                },
                {
                    id: [RETRY_PASSWORD],
                    label: 'Retype password',
                    type: "password",
                },
                {
                    id: [FIRST_NAME],
                    label: 'First name',
                    type: 'text',
                },
                {
                    id: [LAST_NAME],
                    label: 'Last name',
                    type: 'text',
                }]
        }
    }


render()
{
    return (
        <Modal show={true}>
            <Modal.Header>
                <Modal.Title>{(this.state.isEditingUser && "Edit user") || "Create user"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    {this.state.items.map(item =>
                        <FormItem key={item.id}
                                  name={item.label}
                                  type={item.type}
                                  value={this.props.newUser[item.id].value}/>
                    )}
                    <FormCheckBox/>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <HelpBlock>{!checkPassword(this.props.newUser) && PASSWORD_ERROR_MESSAGE}</HelpBlock>
                <Button onClick={() => {
                    this.props.setActiveArea(USER_LIST);
                    this.props.clearErrorStatus();
                }}>Close</Button>
                <Button bsStyle="primary"
                        disabled={
                            !(checkValidationState(this.props.editableName, this.props.newUser, this.state.isEditingUser)
                                && checkPassword(this.props.newUser))}
                        onClick={() => {
                            this.state.isEditingUser ?
                                this.props.saveEditedUser(this.props.newUser, this.props.editableName) :
                                this.props.saveNewUser(this.props.newUser, this.props.editableName);
                        }}>Save</Button>
            </Modal.Footer>
        </Modal>)
}
}

function checkValidationState(signature, newUser, isEditingUser) {
    for (let param in newUser) {
        if (newUser[param].error.length !== 0) {
            if ((param === PASSWORD || param === RETRY_PASSWORD)
                && isEditingUser
                && newUser[param].value === "") {
                continue;
            }
            return false;
        }
    }
    return true;
}

function checkPassword(newUser) {
    return newUser[PASSWORD].value === newUser[RETRY_PASSWORD].value;
}


function mapStateToProps(state) {
    return {
        newUser: state.createUserReducer.newUser,
        editableName: state.createUserReducer[OLD_EDITABLE_USERNAME],
        currentUser: state.generalReducer.currentUser[USERNAME]
    };
}

export default connect(mapStateToProps, (dispatch) => {
        return {
            clearErrorStatus: bindActionCreators(wipeData, dispatch),
            saveNewUser: bindActionCreators(saveNewUser, dispatch),
            saveEditedUser: bindActionCreators(saveEditedUser, dispatch),
            setActiveArea: bindActionCreators(setActiveArea, dispatch),
            addError: bindActionCreators(addError, dispatch)
        }
    }
)(FormList);
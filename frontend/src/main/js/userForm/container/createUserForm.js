import {Button, HelpBlock, Modal} from "react-bootstrap";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {setActiveArea} from "../../actions/actions.jsx";

import FormItem from "../component/label.js";
import FormCheckBox from "../component/checkBox";
import {clearErrorStatus, sendForm} from "../createNewUserActions";
import {PASSWORD_ERROR_MESSAGE, VALIDATION_STATUS, PASSWORD_STATUS, USER_LIST} from "../../const.js";

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
                    <Button bsStyle="primary" disabled={!(this.props.passStatus && this.props.validStatus)}
                            onClick={() => {
                                this.props.sendForm(this.props.newUser)
                            }}>Save</Button>
                </Modal.Footer>
            </Modal.Dialog>)
    }
};

function mapStateToProps(state) {
    return {
        newUser: state.createUserReducer.newUser,
        passStatus: state.createUserReducer[PASSWORD_STATUS],
        validStatus: state.createUserReducer[VALIDATION_STATUS],
    };
}

export default connect(mapStateToProps, (dispatch) => {
        return {
            clearErrorStatus: bindActionCreators(clearErrorStatus, dispatch),
            sendForm: bindActionCreators(sendForm, dispatch),
            setActiveArea: bindActionCreators(setActiveArea, dispatch)
        }
    }
)(FormList);
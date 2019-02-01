import React from "react";
import {ADMIN, NOT_ADMIN} from "../../const";
import {Checkbox, FormGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendParam} from "../createNewUserActions";

class FormCheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let role = e.target.checked ? ADMIN : NOT_ADMIN;
        this.props.sendParam({name: ADMIN, value: role});
    }

    render() {
        return (
            <FormGroup>
                <Checkbox onChange={this.handleChange}>Manager</Checkbox>
            </FormGroup>
        )
    }
}

function mapStateToProps(state) {
    return {
        newUser: state.createUserReducer.newUser,
    };
}

export default connect(mapStateToProps, (dispatch) => {
        return {
            sendParam: bindActionCreators(sendParam, dispatch)
        }
    }
)(FormCheckBox);
import React from "react";
import {ADMIN, NOT_ADMIN} from "../../const";
import {Checkbox, FormGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendParam} from "./actions";

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
                <Checkbox defaultChecked={this.props.isAdmin.value === ADMIN}
                          onChange={this.handleChange}>Manager</Checkbox>
            </FormGroup>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAdmin: state.createUserReducer.newUser[ADMIN],
    };
}

export default connect(mapStateToProps, (dispatch) => {
        return {
            sendParam: bindActionCreators(sendParam, dispatch)
        }
    }
)(FormCheckBox);
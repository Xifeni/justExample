import {Col, Grid, Row} from "react-bootstrap";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import React from "react";

import {setActiveArea} from "../actions/actions.jsx";
import UsersList from "../component/usersList.jsx";
import NavigationBar from "../component/navBar.jsx";
import FormList from "../component/newUserForm.jsx";
import {
    getPermission,
    getUsers,
    simpleValidation,
    sendParam,
    sendForm,
    passwordValidation,
    logout
} from "../actions/actions.jsx";
import {
    CREATE_USER,
    LOGOUT,
    USER_LIST,
    LANG_WARN,
    USERNAME,
    LAST_NAME,
    FIRST_NAME,
    RETRY_PASSWORD,
    PASSWORD
} from './const.js'

class AppView extends React.Component {

    render() {
        return <div className="customRootBlock1">
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <NavigationBar {...this.props} areas={[
                            {name: USER_LIST, text: 'Список пользователей'},
                            {name: CREATE_USER, text: 'Создать нового пользователя'},
                            {name: LOGOUT, text: 'Выйти'}]}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        {this.props.activeArea === (USER_LIST) && <UsersList {...this.props}/>}
                        {this.props.activeArea === (LOGOUT) && this.props.logout()}
                        {this.props.activeArea === (CREATE_USER) && <FormList {...this.props} items={[
                            {
                                id: [USERNAME],
                                label: 'Username',
                                type: 'text',
                                validateFunc: this.props.validation,
                                helpText: LANG_WARN,
                                sendParam: this.props.sendParams
                            },
                            {
                                id: [PASSWORD],
                                label: 'Password',
                                type: "password",
                                validateFunc: this.props.validation,
                                sendParam: this.props.sendParams
                            },
                            {
                                id: [RETRY_PASSWORD],
                                label: 'Retype password',
                                type: "password",
                                validateFunc: this.props.validation,
                                sendParam: this.props.sendParams
                            },
                            {
                                id: [FIRST_NAME],
                                label: 'First name',
                                type: 'text',
                                validateFunc: this.props.validation,
                                helpText: LANG_WARN,
                                sendParam: this.props.sendParams
                            },
                            {
                                id: [LAST_NAME],
                                label: 'Last name',
                                type: 'text',
                                validateFunc: this.props.validation,
                                helpText: LANG_WARN,
                                sendParam: this.props.sendParams
                            }
                        ]}
                                                                              setActiveArea={this.props.setActiveArea}
                                                                              checkPassword={this.props.checkPassword}
                                                                              sendForm={this.props.sendForm}
                                                                              presetUser={this.props.presetUser}/>}
                    </Col>
                </Row>
            </Grid>
        </div>
    }

    componentDidMount() {
        this.props.loadPermissions();
    }
}

function mapStateToProps(state) {
    return {
        activeArea: state.activeArea,
        currentUser: state.currentUser,
        presetUser: state.presetUser
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        loadPermissions: bindActionCreators(getPermission, dispatch),
        setActiveArea: bindActionCreators(setActiveArea, dispatch),
        loadUsers: bindActionCreators(getUsers, dispatch),
        validation: bindActionCreators(simpleValidation, dispatch),
        sendParams: bindActionCreators(sendParam, dispatch),
        sendForm: bindActionCreators(sendForm, dispatch),
        checkPassword: bindActionCreators(passwordValidation, dispatch),
        logout: bindActionCreators(logout, dispatch)
    }
})(AppView);
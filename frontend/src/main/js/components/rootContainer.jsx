import {Col, Grid, Row} from "react-bootstrap";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import React from "react";

import {setActiveArea} from "../actions.jsx";
import UsersList from "./usersList/usersList.jsx";
import NavigationBar from "./navBar/navBar.jsx";
import FormList from "./userForm/createUserForm";
import {
    getPermission,
    getUsers,
    logout
} from "../actions.jsx";
import {
    CREATE_USER,
    LOGOUT,
    USER_LIST,
    USERNAME,
    LAST_NAME,
    FIRST_NAME,
    RETRY_PASSWORD,
    PASSWORD,
    ADMIN
} from '../const.js'

class AppView extends React.Component {

    constructor(props) {
        super(props);
        this.props.loadPermissions();
        this.getNavItems = this.getNavItems.bind(this);
    }

    getNavItems() {
        if (this.props.currentUser[ADMIN] === ADMIN) {
            return [
                {name: USER_LIST, text: 'Список пользователей'},
                {name: CREATE_USER, text: 'Создать нового пользователя'},
                {name: LOGOUT, text: 'Выйти'}]
        } else {
            return [
                {name: USER_LIST, text: 'Список пользователей'},
                {name: LOGOUT, text: 'Выйти'}]
        }
    }

    render() {
        return <div className="customRootBlock1">
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <NavigationBar {...this.props} areas={this.getNavItems()}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        {this.props.activeArea === (USER_LIST) && <UsersList {...this.props}/>}
                        {this.props.activeArea === (LOGOUT) && this.props.logout(this.props.currentUser[USERNAME])}
                        {this.props.activeArea === (CREATE_USER) && <FormList {...this.props} items={[
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
                            }]} presetUser={this.props.presetUser}/>}
                    </Col>
                </Row>
            </Grid>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        activeArea: state.generalReducer.activeArea,
        currentUser: state.generalReducer.currentUser,
        presetUser: state.generalReducer.presetUser
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        loadPermissions: bindActionCreators(getPermission, dispatch),
        setActiveArea: bindActionCreators(setActiveArea, dispatch),
        logout: bindActionCreators(logout, dispatch)
    }
})(AppView);
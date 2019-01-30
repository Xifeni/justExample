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
    logout
} from "../actions/actions.jsx";
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
} from './const.js'

class AppView extends React.Component {

    constructor(props) {
        super(props);

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
                        {this.props.activeArea === (LOGOUT) && this.props.logout()}
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
                            }]} validate={} presetUser={this.props.presetUser}/>}
                    </Col>
                </Row>
            </Grid>
        </div>
    }

    componentWillMount() {
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
        logout: bindActionCreators(logout, dispatch)
    }
})(AppView);
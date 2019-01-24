import {Col, Grid, Row} from "react-bootstrap";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import React from "react";

import {setActiveArea} from "../actions/actions.jsx";
import UsersList from "../component/usersList.jsx";
import NavigationBar from "../component/navBar.jsx";
import FormList from "../component/newUserForm.jsx";
import {getPermission, getUsers, simpleValidation} from "../actions/actions.jsx";
import {CREATE_USER, LOGOUT, USER_LIST, LANG_WARN} from './const.js'
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
                        {this.props.activeArea === (CREATE_USER) && <FormList {...this.props} items={[
                            {id: 'userName', label: 'Username', validateFunc: this.props.validation, helpText : LANG_WARN},
                            {id: 'password1', label: 'Password', type:"password", validateFunc: this.props.validation},
                            {id: 'password2', label: 'Retype password', type:"password", validateFunc: this.props.validation},
                            {id: 'userFirstName', label: 'First name', validateFunc: this.props.validation, helpText : LANG_WARN},
                            {id: 'userLastName', label: 'Last name', validateFunc: this.props.validation, helpText : LANG_WARN}
                            ]} setActiveArea={this.props.setActiveArea}/>}
                    </Col>
                </Row>
            </Grid>
        </div>
    }

    componentDidMount(){
        this.props.loadPermissions();
        this.props.loadUsers()
    }
}

function mapStateToProps(state) {
    return {
        activeArea: state.activeArea,
        currentUser: {},
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        loadPermissions: bindActionCreators(getPermission, dispatch),
        setActiveArea: bindActionCreators(setActiveArea, dispatch),
        loadUsers: bindActionCreators(getUsers, dispatch),
        validation: bindActionCreators(simpleValidation, dispatch)}
})(AppView);
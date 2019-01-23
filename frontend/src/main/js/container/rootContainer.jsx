import {Col, Grid, Row} from "react-bootstrap";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import React from "react";

import {setActiveArea} from "../actions/actions.jsx";
import UsersList from "../component/usersList.jsx";
import NavigationBar from "../component/navBar.jsx";
import FormList from "../component/newUserForm.jsx";
import {getPermission, getUsers} from "../actions/actions.jsx";
import {createNewUserForm, logout, userList} from './const.js'
class AppView extends React.Component {

    render() {
        return <div className="customRootBlock1">
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <NavigationBar {...this.props} areas={[
                            {name: userList, text: 'Список пользователей'},
                            {name: createNewUserForm, text: 'Создать нового пользователя'},
                            {name: logout, text: 'Выйти'}]}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        {this.props.activeArea === (userList) && <UsersList {...this.props}/>}
                        {this.props.activeArea === (createNewUserForm) && <FormList {...this.props} items={[
                            {id: 'userName', label: 'name', validateFunc: getValidationState},
                            {id: 'userLastName', label: 'lastname', validateFunc: getValidationState},
                            {id: 'pass', label: 'password', validateFunc: getValidationState}]} setActiveArea={this.props.setActiveArea}/>}
                    </Col>
                </Row>
            </Grid>
        </div>
    }

    componentDidMount(){
        this.props.loadPermissions()
        this.props.loadUsers()
    }
}



/*вынести в utils*/
function getValidationState(length) {
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
};

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
        loadUsers: bindActionCreators(getUsers, dispatch)
    }
})(AppView);
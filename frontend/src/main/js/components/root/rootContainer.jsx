import {Col, Grid, Row} from "react-bootstrap";
import {bindActionCreators} from 'redux'
import {connect} from "react-redux";
import React from "react";

import {setActiveArea} from "./actions.js";
import UsersList from "../usersList/usersList.jsx";
import NavigationBar from "../navBar/navBar.jsx";
import FormList from "../userForm/createUserForm.jsx";
import {getPermission, logout} from "./actions.js";
import {
    CREATE_USER,
    USERNAME,
    LAST_NAME,
    FIRST_NAME,
    RETRY_PASSWORD,
    PASSWORD,
    ADMIN
} from '../../const'

class AppView extends React.Component {

    constructor(props) {
        super(props);
    }

    getIsAdmin() {
        return this.props.currentUser[ADMIN] === ADMIN;
    }

    getCurrentUsername() {
        return this.props.currentUser[USERNAME];
    }

    componentDidMount() {
        this.props.loadPermissions();
    }

    render() {
        return <div className="customRootBlock1">
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <NavigationBar {...this.props} isAdmin={this.getIsAdmin()}
                                       currentUsername={this.getCurrentUsername()}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        <UsersList {...this.props}/>
                        {this.props.activeArea === (CREATE_USER) && <FormList {...this.props} presetUser={this.props.presetUser}/>}
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
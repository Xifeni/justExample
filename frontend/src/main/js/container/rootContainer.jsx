import {Col, Grid, Row} from "react-bootstrap";
import {connect} from "react-redux";
import React from "react";

import actions from "../actions/actions.jsx";
import UsersList from "../component/usersList.jsx";
import NavigationBar from "../component/navBar.jsx";
import FormList from "../component/newUserForm.jsx";

class AppView extends React.Component {

    render() {
        return <div className="customRootBlock1">
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <NavigationBar {...this.props} areas={[
                            {name: 'MAIN', text: 'Список пользователей'},
                            {name: 'GOD', text: 'Создать нового пользователя'},
                            {name: 'LOGOUT', text: 'Выйти'}]}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        {this.props.activeArea === ("MAIN") && <UsersList {...this.props}/>}
                        {this.props.activeArea === ("GOD") && <FormList {...this.props} items={[
                            {id: 'userName', label: 'name', validateFunc: getValidationState},
                            {id: 'userLastName', label: 'lastname', validateFunc: getValidationState},
                            {id: 'pass', label: 'password', validateFunc: getValidationState}]}/>}
                    </Col>
                </Row>
            </Grid>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        activeArea: state.activeArea,
        users: state.users
    };
}
/*вынести в utils*/
function getValidationState(length) {
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
};

export default connect(mapStateToProps, actions)(AppView);
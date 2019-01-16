import {Col, Grid, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {Component} from "react";
import React from "react";

import actions from "../actions/actions.jsx";
import UsersList from "../component/usersList.jsx";
import NavigationBar from "../component/navBar.jsx";

class AppView extends Component {

    render() {
        return <div className="customRootBlock1">
            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <NavigationBar {...this.props} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        {this.props.activeArea === ("MAIN") && <UsersList {...this.props}/>}
                        {this.props.activeArea === ("GOD") && <a>здесь создают нового пользователя</a>}
                    </Col>
                </Row>
            </Grid>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        activeArea: state.activeArea,
        areas: state.areas,
        users: state.users
    };
}

export default connect(mapStateToProps, actions)(AppView);
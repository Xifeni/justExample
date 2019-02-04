import {Table} from "react-bootstrap";
import {Component} from "react";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUsers, deleteUser, goToEditUser} from "./userListActions";
import Button from "react-bootstrap/es/Button";
import {ADMIN, USERNAME, DELETE_MESSAGE} from "../../const.js";

class UserItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ((this.props.currentUser[ADMIN] === ADMIN && this.props.currentUser[USERNAME] !== this.props.item) &&
            <tr>
                <td><a onClick={() => this.props.goToEditUser(this.props.item, this.props.currentUser[USERNAME])}>{this.props.item}</a></td>
                <td><Button onClick={() => {
                    confirm(DELETE_MESSAGE) && this.props.deleteUser(this.props.item, this.props.currentUser[USERNAME]);
                }}>Delete user</Button></td>
            </tr>) ||
            <tr>
                <td>{this.props.item}</td>
            </tr>
    }
}


class UsersList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUsers();
    }


    render() {
        if (!this.props.loadingStatus) return "loading";

        return <div>
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>User</th>
                </tr>
                </thead>
                <tbody>
                {this.props.users.map(user =>
                    <UserItem key={user} item={user}
                              currentUser={this.props.currentUser}
                              goToEditUser={this.props.goToEditUser}
                              deleteUser={this.props.deleteUser}/>
                )}
                </tbody>
            </Table>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        users: state.userListReducer.users,
        loadingStatus: state.userListReducer.loadingStatus,
        currentUser: state.generalReducer.currentUser
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        loadUsers: bindActionCreators(getUsers, dispatch),
        goToEditUser: bindActionCreators(goToEditUser, dispatch),
        deleteUser: bindActionCreators(deleteUser, dispatch)
    }
})(UsersList);


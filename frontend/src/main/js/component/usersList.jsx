import {Table} from "react-bootstrap";
import {Component} from "react";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUsers, goToEditUser, deleteUser} from "../actions/actions.jsx";
import Button from "react-bootstrap/es/Button";
import {ADMIN, USERNAME, DELETE_MESSAGE} from "../container/const.js";

class UserItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <tr>
            {this.props.item !== this.props.currentUser[USERNAME] && this.props.currentUser[ADMIN] === ADMIN &&
            <td><a onClick={() => this.props.goToEditUser(this.props.item)}>{this.props.item}</a></td>}
            {(this.props.item === this.props.currentUser[USERNAME] || this.props.currentUser[ADMIN] !== ADMIN)
            && <td>{this.props.item}</td>}
            {this.props.currentUser[ADMIN] === ADMIN && this.props.item !== this.props.currentUser[USERNAME] &&
            <td><Button onClick={() => {
                confirm(DELETE_MESSAGE) && this.props.deleteUser(this.props.item)
            }}>Delete user</Button></td>}
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
};

function mapStateToProps(state) {
    return {
        users: state.users,
        loadingStatus: state.loadingStatus,
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        loadUsers: bindActionCreators(getUsers, dispatch),
        goToEditUser: bindActionCreators(goToEditUser, dispatch),
        deleteUser: bindActionCreators(deleteUser, dispatch)
    }
})(UsersList);


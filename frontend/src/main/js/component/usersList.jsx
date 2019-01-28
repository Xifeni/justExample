import {Table} from "react-bootstrap";
import {Component} from "react";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUsers, goToEditUser} from "../actions/actions.jsx";
import Button from "react-bootstrap/es/Button";
import {ADMIN} from "../container/const.js";

class UserItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <tr>
            <td><a onClick={() => this.props.goToEditUser(this.props.item.name)}>{this.props.item.name}</a></td>
            <td>{this.props.item.role}</td>
            <td>{this.props.currentUser[ADMIN] && <Button>"delete"</Button>}</td>
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
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {this.props.users.map(user =>
                    <UserItem key={user.name} item={user} currentUser={this.props.currentUser} goToEditUser={this.props.goToEditUser}/>
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
        goToEditUser: bindActionCreators(goToEditUser, dispatch)
    }
})(UsersList);


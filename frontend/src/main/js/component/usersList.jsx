import {Table} from "react-bootstrap";
import {Component} from "react";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUsers} from "../actions/actions.jsx";
import Button from "react-bootstrap/es/Button";

class UserItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <tr>
            <td>{this.props.item.name}</td>
            <td>{this.props.item.role}</td>
            <td>{this.props.permission === "000" && <Button onClick={console.log(this.props.item.name + " delete")}>"delete"</Button>}</td>
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
                    <UserItem key={user.name} item={user} permission={this.props.permission}/>
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
        permission: state.permission
    };
}

export default connect(mapStateToProps, (dispatch) => {
    return {
        loadUsers: bindActionCreators(getUsers, dispatch)
    }
})(UsersList);


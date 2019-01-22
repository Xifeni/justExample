import {Table} from "react-bootstrap";
import {Component} from "react";
import React from "react";

class UserItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <tr>
            <td>{this.props.item.name}</td>
            <td>{this.props.item.role}</td>
        </tr>
    }
}


export class UsersList extends Component {
    constructor(props) {
        super(props);
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
                    <UserItem key={user.name} item={user}/>
                )}
                </tbody>
            </Table>
        </div>
    }
};


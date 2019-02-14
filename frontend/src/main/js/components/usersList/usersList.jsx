import {Table} from "react-bootstrap";
import {Component} from "react";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getUsers, deleteUser, goToEditUser} from "./actions";
import PropTypes from 'prop-types';
import {UserItem} from "./UserItem.jsx";
import {USERNAME} from "../../const";

class UsersList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    render() {
        if (!this.props.isLoaded) return "loading";

        return <div>
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>User</th>
                </tr>
                </thead>
                <tbody>
                {this.props.users.map(user =>
                    <UserItem key={user[USERNAME]}
                              item={user}
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
        isLoaded: state.userListReducer.isLoaded,
        currentUser: state.generalReducer.currentUser
    };
}

UsersList.propTypes = {
    currentUser: PropTypes.object.isRequired,
    goToEditUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, (dispatch) => {
    return {
        loadUsers: bindActionCreators(getUsers, dispatch),
        goToEditUser: bindActionCreators(goToEditUser, dispatch),
        deleteUser: bindActionCreators(deleteUser, dispatch)
    }
})(UsersList);


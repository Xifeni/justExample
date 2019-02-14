import {Component} from "react";
import React from "react";
import Button from "react-bootstrap/es/Button";
import {ADMIN, USERNAME, DELETE_MESSAGE} from "../../const.js";
import {FIRST_NAME, LAST_NAME} from "../../const";
import PropTypes from "prop-types";

export class UserItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ((this.props.currentUser[ADMIN] === ADMIN && this.props.currentUser[USERNAME] !== this.props.item[USERNAME]) &&
            <tr>
                <td>
                    {this.props.item[FIRST_NAME] + " " + this.props.item[LAST_NAME]+ " "}
                    <a onClick={() => this.props.goToEditUser(this.props.item[USERNAME])}>{"@"+this.props.item[USERNAME]}</a>
                </td>
                <td>
                    <Button onClick={() => {
                        confirm(DELETE_MESSAGE) && this.props.deleteUser(this.props.item, this.props.currentUser[USERNAME]);
                    }}>Delete user</Button>
                </td>
            </tr>) ||
            <tr>
                <td>{this.props.item[FIRST_NAME] + " " + this.props.item[LAST_NAME]}</td>
            </tr>
    }
}

UserItem.propTypes = {
    item: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    goToEditUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
};


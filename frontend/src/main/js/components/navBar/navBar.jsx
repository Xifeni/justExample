import React from "react";
import Nav from "react-bootstrap/lib/Nav";
import Navbar from "react-bootstrap/lib/NavBar";
import NavItem from "react-bootstrap/lib/NavItem";
import {Panel} from "react-bootstrap";
import PanelBody from "react-bootstrap/es/PanelBody";
import PropTypes from 'prop-types';
import {CREATE_USER, LOGOUT, USER_LIST} from "../../const";

class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Panel onClick={() => this.props.setActiveArea(this.props.idArea)}>
                <PanelBody>{this.props.text}</PanelBody>
            </Panel>
        </div>
    }
}

export default class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Navbar>
                <Nav navbar variant="pills">
                    <NavItem>
                        <Item key={USER_LIST} text={'Список пользователей'} idArea={USER_LIST}
                              setActiveArea={this.props.setActiveArea}/>
                    </NavItem>
                    <NavItem>
                        {this.props.isAdmin &&
                        <Item key={CREATE_USER} text={'Создать нового пользователя'} idArea={CREATE_USER}
                              setActiveArea={this.props.setActiveArea}/>}
                    </NavItem>
                    <NavItem>
                        <Item key={LOGOUT} text={'Выйти'} idArea={this.props.currentUsername}
                              setActiveArea={this.props.logout}/>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    }
}

Item.propTypes = {
    key: PropTypes.string,
    text: PropTypes.string.isRequired,
    idArea: PropTypes.string.isRequired,
    setActiveArea: PropTypes.func,
};
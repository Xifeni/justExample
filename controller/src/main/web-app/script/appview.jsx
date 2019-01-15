import React from "react";
import {connect} from "react-redux";
import actions from "./actions.jsx";
import Nav from "react-bootstrap/lib/Nav";
import Navbar from "react-bootstrap/lib/NavBar";
import NavItem from "react-bootstrap/lib/NavItem";
import PropTypes from 'prop-types'

class Item extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return <div>
            <p>
                <button onClick={() => this.props.sayHello(this.props.text)}>{this.props.text}</button>
            </p>
        </div>
    }
}

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Navbar>
                <Nav navbar>
                    {this.props.buttons.map(item =>
                        <NavItem>
                            <Item key={item}
                                       text={item}
                                       sayHello={this.props.sayHello}/>
                        </NavItem>
                    )}
                </Nav>
            </Navbar>
        </div>
    }
}

class UsersList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
            {this.props.users.map(item =>
                <Item key={item}
                           text={item}
                           sayHello={this.props.sayHello}/>
            )}
        </div>
    }
};

class AppView extends React.Component {

    render() {
        return <div>
            <NavigationBar {...this.props} />
            <UsersList {...this.props} />
        </div>
    }
}

function mapStateToProps(state) {
    return {
        buttons: state.get("buttons"),
        users: state.get("users")
    };
}
export default connect(mapStateToProps, actions)(AppView);
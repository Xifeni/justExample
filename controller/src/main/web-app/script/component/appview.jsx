import React from "react";
import {connect} from "react-redux";
import actions from "../actions/actions.jsx";
import Nav from "react-bootstrap/lib/Nav";
import Navbar from "react-bootstrap/lib/NavBar";
import NavItem from "react-bootstrap/lib/NavItem";
import {ListGroup, ListGroupItem} from "react-bootstrap";

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
                                  text={item.text}
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
            <ListGroup>
                {this.props.users.map(item =>
                    <ListGroupItem>
                        <Item key={item.name}
                              text={item.role}
                              sayHello={this.props.sayHello}/>
                    </ListGroupItem>
                )}
            </ListGroup>
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
        buttons: state.buttons,
        users: state.users
    };
}

export default connect(mapStateToProps, actions)(AppView);
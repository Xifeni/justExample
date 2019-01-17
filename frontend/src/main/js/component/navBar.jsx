import React from "react";
import Nav from "react-bootstrap/lib/Nav";
import Navbar from "react-bootstrap/lib/NavBar";
import NavItem from "react-bootstrap/lib/NavItem";
import {Panel} from "react-bootstrap";
import PanelBody from "react-bootstrap/es/PanelBody";

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
                <Nav navbar bsStyle="pills">
                    {this.props.areas.map(item =>
                        <NavItem key={item.name}>
                            <Item key={item.name}
                                  text={item.text}
                                  idArea={item.name}
                                  setActiveArea={this.props.setActiveArea}/>
                        </NavItem>
                    )}
                </Nav>
            </Navbar>
        </div>
    }
}


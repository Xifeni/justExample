'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {liked: false};
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return e(
            'button',
            {
                onClick: () => {
                    this.setState({liked: true})
                    sayHello();
                }
            },
            'Like'
        );
    }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(e(LikeButton), domContainer);

var rpcClient;

window.onload = function () {
    rpcClient = new JSONRpcClient("JSON-RPC");
};

function sayHello() {
    rpcClient.rpcTester.getSayHello();
}
//import {clickButton} from "../action/justButtonAction.jsx";

import {clickButton} from "../action/justButtonAction.jsx";

import React from 'react';
import {connect} from 'react-redux';

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <p>
                <b>{this.props.text}</b><br/>
                /*<button id={this.props.text}></button>*/
                <button onClick={() => clickButton()}>Like</button>
            </p>
        </div>
    }
}

class ButtonsList extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return <div>
            {this.props.buttons.map(item =>
                <LikeButton text={item}
                />
            )}
        </div>
    }
}

class AppView extends React.Component {

    render() {
        return <div>
            <ButtonsList {...this.props} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        buttons: state.get("buttons")
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (button) => {
            sayHello();
            dispatch(clickButton())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppView);
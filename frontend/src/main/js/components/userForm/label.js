import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendParam} from "./createNewUserActions";
import {ERROR, LANG_WARN, SUCCESS} from "../../const";

class FormItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.setState({
            value: e.target.value,
        });
        this.props.sendParam({name: this.props.name, value: e.target.value});
    };

    render() {
        return (
            <FormGroup
                key={this.props.key}
                validationState={transformToStyle(this.props.newUser[this.props.name].validationState)}>
                <ControlLabel>{this.props.name}</ControlLabel>
                <FormControl
                    id={this.props.name}
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <HelpBlock>{(this.props.newUser[this.props.name].validationState === false && LANG_WARN)}</HelpBlock>
            </FormGroup>
        );
    }
}

function transformToStyle(status) {
    if (status === null) {
        return null;
    }
    return status ? SUCCESS : ERROR;
}

function mapStateToProps(state) {
    return {
        newUser: state.createUserReducer.newUser,
    };
}

export default connect(mapStateToProps, (dispatch) => {
        return {
            sendParam: bindActionCreators(sendParam, dispatch)
        }
    }
)(FormItem);
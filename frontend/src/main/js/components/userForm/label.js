import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendParam} from "./createNewUserActions";
import {ERROR, LANG_WARN, SUCCESS, VALIDATION_ARRAY} from "../../const";

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
                validationState={transformToStyle(this.props.validStatus[this.props.name].isValid)}>
                <ControlLabel>{this.props.name}</ControlLabel>
                <FormControl
                    id={this.props.name}
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <HelpBlock>{(this.props.validStatus[this.props.name].isValid === false
                    && this.props.validStatus[this.props.name].error.join())}</HelpBlock>
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
        validStatus: state.createUserReducer[VALIDATION_ARRAY],
    };
}

export default connect(mapStateToProps, (dispatch) => {
        return {
            sendParam: bindActionCreators(sendParam, dispatch)
        }
    }
)(FormItem);
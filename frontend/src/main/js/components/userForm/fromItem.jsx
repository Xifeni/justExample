import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {sendParam} from "./actions";
import {ERROR, SUCCESS} from "../../const";
import PropTypes from 'prop-types';


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
                validationState={transformToStyle(this.props.errors, this.state.value)}>
                <ControlLabel>{this.props.name}</ControlLabel>
                <FormControl
                    id={this.props.name}
                    type={this.props.type}
                    value={this.state.value}
                    onChange={this.handleChange}/>
                <HelpBlock>{(this.props.errors !== null && this.props.errors.length !== 0
                    && this.props.errors.join())}</HelpBlock>
            </FormGroup>
        );
    }
}

function transformToStyle(errors, value) {
    if (errors === null && value === null) {
        return null;
    }
    return errors.length === 0 ? SUCCESS : ERROR;
}

function mapStateToProps(state, props) {
    return {
        errors: state.createUserReducer.newUser[props.name].error,
    };
}


FormItem.propType = {
    key: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    validationState: PropTypes.string
};

export default connect(mapStateToProps, (dispatch) => {
        return {
            sendParam: bindActionCreators(sendParam, dispatch)
        }
    }
)(FormItem);


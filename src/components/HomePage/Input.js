import React, {Component} from 'react';
import block from "bem-cn";
import PropTypes from "prop-types"

const Input = ({className, ...props}) => {
    const b = block("input");
    const mix = className ? className.mix(b) : b;

    return (
        <input className={mix} {...props}/>
    );
};

Input.propTypes = {
    className: PropTypes.func
};

export class FormControl extends Component {
    onChange = (e) => {
        const value = e.target.value;
        this.props.onValueChange(value);
    };

    render() {
        const {onValueChange, ...props} = this.props;
        return (<Input {...props} onChange={this.onChange}/>)
    }
}

FormControl.propTypes = {
    onValueChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};

export default Input;

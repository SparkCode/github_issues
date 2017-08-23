import React from 'react';
import block from "bem-cn";
import PropTypes from "prop-types"

const FormControl = ({className, ...props}) => {
    const b = block("form-control");
    const mix = className ? className.mix(b) : b;

    return (
        <input className={mix} {...props}/>
    );
};

FormControl.propTypes = {
    className: PropTypes.func
};

export default FormControl;

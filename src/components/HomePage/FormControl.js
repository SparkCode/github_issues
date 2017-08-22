import React from 'react';
import block from "bem-cn";

const FormControl = ({className, ...props}) => {
    const b = block("form-control ");
    return (
        <input className={className.mix(b)} {...props}/>
    );
};

export default FormControl;

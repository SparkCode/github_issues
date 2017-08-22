import React from 'react';
import block from "bem-cn";

const Button = ({children, className, ...otherProps}) => {
    const b = block("button");
    return (
        <button className={className.mix(b)} {...otherProps}>{children}</button>
    );
};

export default Button;

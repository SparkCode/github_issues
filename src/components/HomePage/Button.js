import React from 'react';
import block from "bem-cn";
import PropTypes from "prop-types"

const Button = ({children, className, ...otherProps}) => {
    const b = block("button");
    const mix = className ? className.mix(b) : b;

    return (
        <button className={mix} {...otherProps}>{children}</button>
    );
};

Button.propTypes = {
    className: PropTypes.func,
    children: PropTypes.string
};

export default Button;

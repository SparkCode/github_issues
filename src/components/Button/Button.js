import React, {PureComponent} from 'react';
import block from "bem-cn";
import PropTypes from "prop-types"
import * as cn from "classnames"
import "./Button.css"

class Button extends PureComponent {
    render() {
        const {children, className, ...otherProps} = this.props;
        const b = block("button");
        return (
            <button className={cn(className, b())} {...otherProps}>{children}</button>
        );
    }
}

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string
};

export default Button;

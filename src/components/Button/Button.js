import React, {PureComponent} from 'react';
import block from "bem-cn";
import PropTypes from "prop-types"
import classnames from "classnames"
import "./Button.css"

class Button extends PureComponent {
    render() {
        const {children, className, ...otherProps} = this.props;
        const b = block("button");
        return (
            <button className={classnames(className, b())} {...otherProps}>{children}</button>
        );
    }
}

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string
};

export default Button;

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import "./Link.css"
import block from "bem-cn"
import * as cn from "classnames"

class Link extends PureComponent {
    render() {
        const {className, children, ...props} = this.props;
        const b = block("link");
        return (
            <a className={cn(className, b())} {...props}>{children}</a>
        );
    }
}

Link.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired
};

export default Link;

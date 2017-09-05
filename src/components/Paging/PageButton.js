import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as cn from "classnames";
import block from "bem-cn";
import "./PageButton.css"

class PageButton extends PureComponent {
    onClick = () => {
        const {gotoNewPage, name} = this.props;
        gotoNewPage(name);
    };

    render() {
        const {className, name, active, gotoNewPage, ...props} = this.props;
        const b = block("page-button")({active});
        return (
            <button className={cn(className, b())} onClick={this.onClick} {...props}>{name}</button>
        );
    }
}

PageButton.propTypes = {
    gotoNewPage: PropTypes.func.isRequired,
    name: PropTypes.string,
    className: PropTypes.string,
    active: PropTypes.bool
};
PageButton.defaultProps = {
    active: false
};

export default PageButton;

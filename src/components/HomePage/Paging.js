import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";
import * as cn from "classnames";

class PageButton extends PureComponent {
    onClick = () => {
        const {gotoNewPage, name} = this.props;
        gotoNewPage(name);
    };

    render() {
        const {className, name, active, gotoNewPage, ...props} = this.props;
        const element = block("page-button")({active});
        return (
            <button className={cn(className, element())} onClick={this.onClick} {...props}>{name}</button>
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


class Paging extends PureComponent {
    _getButtonsConfigure(pagesNumber, currentPage, start, finish, className) {
        let configures = [];
        if (start > 1) {
            configures.push({name: "1", value: 1, key: "1"});
            configures.push({name: "...", key: "unshown-right", disabled: true});
        }

        for (let i = start; i <= finish; i++) {
            configures.push({name: i.toString(), active: i === currentPage, key: i.toString(), value:i});
        }

        if (finish < pagesNumber) {
            configures.push({name: "...", key: "unshown-left", disabled: true});
            configures.push({name: pagesNumber.toString(), value:pagesNumber, key: pagesNumber.toString()});
        }

        return configures.map(b => {return{...b, className}});
    };

    render() {
        const {pagesNumber, currentPage, gotoNewPage, maxVisiblePagesFromEachSide=2} = this.props;
        const b = block("paging");
        const startVisiblePage = Math.max(currentPage - maxVisiblePagesFromEachSide, 1);
        const finishVisiblePage = Math.min(currentPage + maxVisiblePagesFromEachSide, pagesNumber);
        const buttonsConfigure =
            this._getButtonsConfigure(pagesNumber, currentPage, startVisiblePage, finishVisiblePage, b("page-link")());
        const buttons = buttonsConfigure.map(c => (<PageButton gotoNewPage={gotoNewPage}  {...c}/>));
        return (
            <div className={b}>
                {buttons}
            </div>
        );
    }
}

Paging.propTypes = {
    gotoNewPage: PropTypes.func.isRequired,
    pagesNumber: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    maxVisiblePagesFromEachSide: PropTypes.number
};
Paging.defaultProps = {};

export default Paging;


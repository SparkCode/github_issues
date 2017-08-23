import React, {Component} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";

const PageButton = ({className, name, active, ...props}) => {
    const b = block("page-button");
    const m = b({active});
    const mix = className ? className.mix(m) : m;
      return (
          <button className={mix} {...props}>{name}</button>
      );
};

class Paging extends Component {
    constructor(props) {
        super(props);
        const {currentPage} = this.props;
        this.state = {currentPage};
    }

    onClick = (page) => () => {
        this.setState({currentPage: page});
        const {gotoNewPage} = this.props;
        gotoNewPage(page);
    };

    getButtonsConfigure(pagesNumber, currentPage, start, finish, className) {
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
        const {pagesNumber, maxVisiblePagesFromEachSide=2} = this.props;
        const {currentPage} = this.state;
        const b = block("paging");
        const startVisiblePage = Math.max(currentPage - maxVisiblePagesFromEachSide, 1);
        const finishVisiblePage = Math.min(currentPage + maxVisiblePagesFromEachSide, pagesNumber);
        const buttonsConfigure =
            this.getButtonsConfigure(pagesNumber, currentPage, startVisiblePage, finishVisiblePage, b("page-link"));
        const buttons = buttonsConfigure.map(c => (<PageButton onClick={this.onClick(c.value)} {...c}/>));
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
    maxVisiblePagesFromEachSide: PropTypes.number
};
Paging.defaultProps = {};

export default Paging;


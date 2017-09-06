import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn"
import "./Option.css"

class Option extends PureComponent {
    onMouseOver = () => {
        const {index, onOptionHover} = this.props;
        onOptionHover(index);
    };

    render() {
        const {option, index, isSelected, optionRef} = this.props;
        const b = block("autocomplete-list-option");
        return (
            <li
                className={b({active: isSelected})}
                ref={optionRef}
                key={index}
                value={option}
                onMouseOver={this.onMouseOver}>
                {option}
            </li>
        );
    }
}

Option.propTypes = {
    option: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onOptionHover: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    optionRef: PropTypes.func.isRequired
};
Option.defaultProps = {};

export default Option;

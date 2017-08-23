import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

const DropDownList = ({className, options, value, onOptionSelected}) => {
    const b = block("drop-down-list");
    const mix = className ? className.mix(b) : b;

    return (
        <select className={mix} value={value} onChange={onOptionSelected}>
            {options.map((option, i) =>
                <option className={b("option")} key={i}>{option}</option>)}
        </select>
    );
};

DropDownList.propTypes = {
    className: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    onOptionSelected: PropTypes.func.isRequired
};

DropDownList.defaultProps = {};

export default DropDownList;







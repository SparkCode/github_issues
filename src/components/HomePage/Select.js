import React, {Component} from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

const Select = ({className, options, value, onOptionSelected}) => {
    const b = block("select");
    const mix = className ? className.mix(b) : b;

    return (
        <select className={mix} value={value} onChange={onOptionSelected}>
            {options.map((option, i) =>
                <option className={b("option")} key={i}>{option}</option>)}
        </select>
    );
};

Select.propTypes = {
    className: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired
};

Select.defaultProps = {};

export class FormSelect extends Component {
    onChange = (e) => {
        const value = e.target.value;
        this.props.onValueChange(value);
    };

    render() {
        return (<Select {...this.props} onOptionSelected={this.onChange}/>)
    }
}

FormSelect.propTypes = {
    onValueChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
};


export default Select;







import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import classnames from 'classnames';
import './Select.scss';

class Select extends PureComponent {
  onChange = e => {
    const { value } = e.target;
    this.props.onValueChange(value);
  };

  render() {
    const { className, options, value } = this.props;
    const b = block('select');

    return (
      <select className={classnames(className, b())} value={value} onChange={this.onChange}>
        {options.map((option, i) => (
          <option className={b('option')()} key={i}>
            {option}
          </option>
        ))}
      </select>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default Select;

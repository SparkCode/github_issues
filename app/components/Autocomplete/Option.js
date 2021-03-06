import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import './Option.scss';

class Option extends PureComponent {
  onMouseOver = () => {
    const { index, onOptionHover } = this.props;
    onOptionHover(index);
  };

  render() {
    const { option, isSelected, optionRef } = this.props;
    const b = block('autocomplete-list-option');
    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <li className={b({ active: isSelected })()} ref={optionRef} value={option} onMouseOver={this.onMouseOver}>
        {option}
      </li>
    );
  }
}

Option.propTypes = {
  option: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onOptionHover: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  optionRef: PropTypes.func,
};
Option.defaultProps = {
  optionRef: () => {},
};

export default Option;

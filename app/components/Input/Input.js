import React, { PureComponent } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Input.scss';

class Input extends PureComponent {
  onChange = ({ target: { value } }) => this.props.onValueChange(value);

  render() {
    const { className, inputRef, onValueChange, ...props } = this.props;
    const b = block('input');
    return <input {...props} className={classnames(className, b())} ref={inputRef} onChange={this.onChange} />;
  }
}

Input.propTypes = {
  className: PropTypes.string,
  inputRef: PropTypes.func,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;

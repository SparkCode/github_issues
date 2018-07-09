import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import KeyCodes from 'utils/keyCodes';
import classnames from 'classnames';
import Input from 'components/Input';
import './Autocomplete.scss';
import OptionsList from './OptionsList';

class AutoComplete extends PureComponent {
  defaultState = { focusedOptionIndex: -1, isInputHasFocus: false };

  constructor(props) {
    super(props);
    this.state = this.defaultState;
  }

  onInputFocus = () => {
    this.setState({ isInputHasFocus: true });
  };

  onInputBlur = () => {
    const { isControlledByMouse } = this.state;
    if (isControlledByMouse) {
      const { options } = this.props;
      const { focusedOptionIndex } = this.state;
      this.onOptionSelect(options[focusedOptionIndex]);
    }
    this.setState(this.defaultState);
  };

  onOptionSelect = value => {
    const { onValueChange, onOptionSelected } = this.props;
    onValueChange(value);
    onOptionSelected(value);
  };

  onOptionHover = index => {
    this.setState({ focusedOptionIndex: index, isControlledByMouse: true });
  };

  onOptionsListHoverOut = () => {
    this.setState({ focusedOptionIndex: -1, isControlledByMouse: false });
  };

  focusNextOption = (step, focusedOptionIndex, optionsCount) => {
    let newIndex = focusedOptionIndex + step;
    if (newIndex >= optionsCount) {
      newIndex = -1;
    } else if (newIndex < -1) {
      newIndex = optionsCount - 1;
    }
    return { focusedOptionIndex: newIndex };
  };

  onKeyPress = e => {
    this.setState({ isControlledByMouse: false });
    switch (e.keyCode) {
      case KeyCodes.enter: {
        const { focusedOptionIndex } = this.state;
        if (focusedOptionIndex !== -1) {
          const { options } = this.props;
          this.onOptionSelect(options[focusedOptionIndex]);
          this.inputElement.blur();
        }
        break;
      }

      case KeyCodes.top: {
        e.preventDefault();
        this.setState((prevState, props) => {
          const { focusedOptionIndex } = prevState;
          return this.focusNextOption(-1, focusedOptionIndex, props.options.length);
        });
        break;
      }

      case KeyCodes.bottom: {
        e.preventDefault();
        this.setState((prevState, props) => {
          const { focusedOptionIndex } = prevState;
          return this.focusNextOption(1, focusedOptionIndex, props.options.length);
        });
        break;
      }
      default:
        break;
    }
  };

  onInputValueChange = value => {
    const { onValueChange } = this.props;
    this.setState({ focusedOptionIndex: -1 });
    onValueChange(value);
  };

  render() {
    const { className, options, value, onOptionSelected, ...props } = this.props;
    const { isInputHasFocus, focusedOptionIndex } = this.state;
    const b = block('autocomplete');
    return (
      <div className={classnames(className, b())}>
        <Input
          {...props}
          className={b('control')()}
          value={value}
          onFocus={this.onInputFocus}
          onBlur={this.onInputBlur}
          onValueChange={this.onInputValueChange}
          onKeyDown={this.onKeyPress}
          inputRef={input => {
            this.inputElement = input;
          }}
        />
        <OptionsList
          options={options}
          focusedOptionIndex={focusedOptionIndex}
          isInputHasFocus={isInputHasFocus}
          onOptionHover={this.onOptionHover}
          onOptionsListHoverOut={this.onOptionsListHoverOut}
        />
      </div>
    );
  }
}

AutoComplete.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  onOptionSelected: PropTypes.func,
};
AutoComplete.defaultProps = {
  value: '',
  options: [],
  onValueChange: () => {},
  onOptionSelected: () => {},
};

export default AutoComplete;

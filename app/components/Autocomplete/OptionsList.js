import React, { PureComponent } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import Option from './Option';
import './OptionsList.scss';

class OptionsList extends PureComponent {
  componentDidUpdate(prevProps) {
    if (this.shouldScrollToOption(prevProps)) {
      this.scrollToOption();
    } else if (this.shouldScrollListToTop(prevProps)) {
      this.scrollListToTop();
    }
  }

  shouldScrollListToTop(prevProps) {
    return prevProps.options !== this.props.options;
  }

  scrollListToTop() {
    this.optionsListElement.scrollTop = 0;
  }

  shouldScrollToOption(prevProps) {
    const { focusedOptionIndex } = this.props;
    const prevFocusedOptionIndex = prevProps.focusedOptionIndex;
    return focusedOptionIndex !== prevFocusedOptionIndex && this.focusedOptionElement;
  }

  scrollToOption() {
    const viewportTop = this.optionsListElement.scrollTop;
    const viewportBottom = viewportTop + this.optionsListElement.offsetHeight;

    const optionTop = this.focusedOptionElement.offsetTop;
    const optionBottom = optionTop + this.focusedOptionElement.clientHeight;

    if (optionBottom > viewportBottom) {
      this.optionsListElement.scrollTop += optionBottom - viewportBottom;
    } else if (optionTop < viewportTop) {
      this.optionsListElement.scrollTop = optionTop;
    }
  }

  render() {
    const { options, focusedOptionIndex, isInputHasFocus, onOptionsListHoverOut, ...props } = this.props;
    const b = block('autocomplete-options');
    return (
      <ul
        className={b({ unseen: !isInputHasFocus })()}
        onMouseLeave={onOptionsListHoverOut}
        ref={el => {
          this.optionsListElement = el;
        }}
      >
        {options.map((option, i) => (
          <Option
            option={option}
            index={i}
            optionRef={el => {
              if (i === focusedOptionIndex) this.focusedOptionElement = el;
            }}
            isSelected={i === focusedOptionIndex}
            key={option}
            {...props}
          />
        ))}
      </ul>
    );
  }
}

OptionsList.propTypes = {
  options: PropTypes.array.isRequired,
  focusedOptionIndex: PropTypes.number.isRequired,
  isInputHasFocus: PropTypes.bool.isRequired,
  onOptionsListHoverOut: PropTypes.func.isRequired,
};
OptionsList.defaultProps = {};

export default OptionsList;

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Option from "./Option";
import block from "bem-cn";
import "./OptionsList.css"

class OptionsList extends PureComponent {
    componentDidUpdate(prevProps) {
        const {focusedOptionIndex} = this.props;
        const prevFocusedOptionIndex = prevProps.focusedOptionIndex;
        if (focusedOptionIndex !== prevFocusedOptionIndex)
            this._changeScrollPosition();
    }

    _changeScrollPosition() {
        if (this.focusedOptionElement) {
            const viewportTop = this.optionsListElement.scrollTop ;
            const viewportBottom = viewportTop + this.optionsListElement.offsetHeight;

            const optionTop = this.focusedOptionElement.offsetTop;
            const optionBottom = optionTop + this.focusedOptionElement.clientHeight;

            if (optionBottom > viewportBottom) {
                this.optionsListElement.scrollTop += optionBottom - viewportBottom;

            } else if (optionTop < viewportTop) {
                this.optionsListElement.scrollTop = optionTop;
            }
        }
        else
            this.optionsListElement.scrollTop = 0;

    }

    render() {
        const {options, focusedOptionIndex, isInputHasFocus, ...props} = this.props;
        const b = block("autocomplete-options");
        return (
            <ul
                className={b({unseen: !isInputHasFocus})}
                ref={(el) => this.optionsListElement = el}>
                {options.map((option, i) =>
                    <Option option={option}
                            index={i}
                            optionRef={(el) => i === focusedOptionIndex && (this.focusedOptionElement = el)}
                            isSelected={i === focusedOptionIndex}
                            key={i}
                            {...props}/>
                )}
            </ul>
        );
    }
}

OptionsList.propTypes = {
    options: PropTypes.array.isRequired,
    focusedOptionIndex: PropTypes.number.isRequired,
    isInputHasFocus: PropTypes.bool.isRequired
};
OptionsList.defaultProps = {};

export default OptionsList;

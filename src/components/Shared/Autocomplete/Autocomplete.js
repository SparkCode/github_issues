import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";
import * as cn from "classnames";
import Input from "./../Input";
import KeyCodes from "../../../utils/keyCodes"
import "./Autocomplete.css"


class AutoComplete extends PureComponent {
    defaultState = {focusedOptionIndex: -1, isInputHasFocus: false};

    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }

    onInputFocus = () => {
        this.setState({isInputHasFocus: true});
    };

    onInputBlur = () => {
        this.setState(this.defaultState);
        this.focusedOptionElement = undefined;
        this.optionsListElement.scrollTop = 0;
        this.hoveredOptionValue && this._onOptionSelect(this.hoveredOptionValue);
    };

    _onOptionSelect = (value) => {
        const {onValueChange, onOptionClicked} = this.props;
        onValueChange(value);
        onOptionClicked(value);
    };

    onOptionHover = (value) => () => {
        this.hoveredOptionValue = value;
    };

    _focusNextOption = (step, focusedOptionIndex, optionsCount) => {
        let newIndex = focusedOptionIndex + step;
        if (newIndex >= optionsCount)
            newIndex = -1;
        else if (newIndex < -1)
            newIndex = optionsCount - 1;
        return {focusedOptionIndex: newIndex};
    };

    onKeyPress = (e) => {
        switch (e.keyCode) {
            case KeyCodes.enter: {
                const {focusedOptionIndex} = this.state;
                const {options} = this.props;
                if (focusedOptionIndex !== - 1) {
                    this._onOptionSelect(options[focusedOptionIndex]);
                    this.input.blur();
                }
                return
            }

            case KeyCodes.top: {
                e.preventDefault();
                this.setState((prevState, props) => {
                    const {focusedOptionIndex} = prevState;
                    return this._focusNextOption(-1, focusedOptionIndex, props.options.length);
                });
                return
            }

            case KeyCodes.bottom: {
                e.preventDefault();
                this.setState((prevState, props) => {
                    const {focusedOptionIndex} = prevState;
                    return this._focusNextOption(1, focusedOptionIndex, props.options.length);
                });
                return
            }

            default: return;
        }
    };

    onInputValueChange= (value) => {
        const {onValueChange} = this.props;
        this.setState({focusedOptionIndex: -1});
        this.focusedOptionElement = undefined;
        this.optionsListElement.scrollTop = 0;
        onValueChange(value);
    };

    _changeScrollPosition() {
        if(this.focusedOptionElement) {
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
    }

    componentDidUpdate(prevProps) {
        const focusedOptionIndex = this.props;
        const prevFocusedOptionIndex = prevProps.focusedOptionIndex;
        if (focusedOptionIndex !== prevFocusedOptionIndex)
            this._changeScrollPosition();
    }

    render() {
        const {className, options, value, onOptionClicked, ...props} = this.props;
        const {isInputHasFocus, focusedOptionIndex} = this.state;
        const b = block("drop-down-list");
        let focusedOptionValue = focusedOptionIndex !== -1 ? options[focusedOptionIndex] : undefined;
        return (
            <div className={cn(className, b())} onKeyDown={this.onKeyPress}>
                <Input
                    {...props}
                    className={b("control")()}
                    value={focusedOptionValue || value}
                    onFocus={this.onInputFocus}
                    onBlur={this.onInputBlur}
                    onValueChange={this.onInputValueChange}
                    inputRef={input => this.input = input}/>
                <ul
                    className={b("options", {unseen: !isInputHasFocus})}
                    onMouseLeave={this.onOptionHover(null)}
                    ref={(el) => this.optionsListElement = el}>
                    {options.map((option, i) =>
                        <li
                            className={b("option", {active: focusedOptionIndex === i})}
                            ref={(el) => i === focusedOptionIndex && (this.focusedOptionElement = el)}
                            key={i}
                            value={option}
                            onMouseOver={this.onOptionHover(option)}>
                            {option}
                        </li>)}
                </ul>
            </div>
        );
    }
}

AutoComplete.propTypes = {
    className: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onOptionClicked: PropTypes.func
};
AutoComplete.defaultProps = {
    onOptionClicked: () => {}
};

export default AutoComplete;

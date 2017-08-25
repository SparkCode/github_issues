import React, {Component} from 'react';
import PropTypes from 'prop-types';
import block from "bem-cn";
import {FormControl} from "./Input";

class DropDownList extends Component {
    constructor(props) {
        super(props);
        this.state = {isInputHasFocus: false};
    }

    onInputFocused = () => {
        this.setState({isInputHasFocus: true});
    };

    onInputUnfocused = () => {
        this.setState({isInputHasFocus: false});
        const {onValueChange, onOptionClicked} = this.props;
        if (this.potentionalValue)
        {
            onValueChange(this.potentionalValue);
            onOptionClicked(this.potentionalValue);
        }
    };

    changePotentionalValue = (value) => () => {
        this.potentionalValue = value;
    };

    render() {
        const {className, options, value, onValueChange, onOptionClicked, ...props} = this.props;
        const {isInputHasFocus} = this.state;
        const b = block("drop-down-list");
        const mix = className ? className.mix(b) : b;
        return (
            <div className={mix}>
                <FormControl
                    className={b("control")}
                    value={value}
                    onFocus={this.onInputFocused}
                    onBlur={this.onInputUnfocused}
                    onValueChange={onValueChange}
                    {...props}/>
                <ul
                    className={b("options", {unseen: !isInputHasFocus})}
                    onMouseLeave={this.changePotentionalValue(null)}>
                    {options.map((option, i) =>
                        <li
                            className={b("option")}
                            key={i}
                            value={option}
                            onMouseOver={this.changePotentionalValue(option)}>
                            {option}
                        </li>)}
                </ul>
            </div>
        );
    }
}

DropDownList.propTypes = {
    className: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    onValueChange: PropTypes.func.isRequired,
    onOptionClicked: PropTypes.func
};
DropDownList.defaultProps = {
    onOptionClicked: () => {}
};

export default DropDownList;

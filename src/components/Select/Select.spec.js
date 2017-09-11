import {shallow} from "enzyme";
import Select from "./Select";
import React from "react";
import sinon from "sinon";

describe("<Select/>", () => {
    const defaultProps = {
        options: ['option1', 'option2', 'option3'],
        value: 'option1'
    };

    beforeEach(() => {
        defaultProps.onValueChange = sinon.spy();
    });

    const setup = (propsOverrides) => {
        const props = {...defaultProps, ...propsOverrides};
        const wrapper = shallow(<Select {...props}/>);

        return {
            props,
            wrapper
        }
    };

    it("should render without crashing", () => {
        setup();
    });

    it("should render with class", () => {
        const className = "search-issues-class";
        const {wrapper} = setup({className});
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it("should call onValueChange callback when value is selected", () => {
        const {wrapper, props} = setup();
        const newValue = props.options[2];
        wrapper.simulate("change", {target: {value: newValue}});
        expect(props.onValueChange.calledOnce && props.onValueChange.calledWithExactly(newValue)).toBeTruthy();
    });
});
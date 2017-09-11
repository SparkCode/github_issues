import {shallow} from "enzyme";
import Option from "./Option";
import React from "react";
import sinon from "sinon";

describe("<Option/>", () => {
    const defaultProps = {
        option: "option",
        index: 5
    };

    beforeEach(() => {
        defaultProps.onOptionHover = sinon.spy();
    });

    const setup = (propsOverrides) => {
        const props = {...defaultProps, ...propsOverrides
        };

        const wrapper = shallow(<Option {...props}/>);

        return {
            wrapper,
            option: wrapper.find(".autocomplete-list-option"),
            props
        }

    };

    it("should render without crashing when required options be provided", () => {
        setup();
    });

    it("should render with autocomplete-list-option_active class when option is selected", () => {
        const {option} = setup({isSelected: true});
        expect(option.find(".autocomplete-list-option_active").exists()).toBeTruthy();
    });

    it("should render without autocomplete-list-option_active class when isSelected is not be true", () => {
        const {option} = setup({isSelected: false});
        expect(option.find(".autocomplete-list-option_active").exists()).toBeFalsy();
    });

    it("should call onOptionHover callback with option index when onmouseover event fired", () => {
        const {option, props} = setup();
        option.simulate("mouseover");
        expect(props.onOptionHover.calledOnce && props.onOptionHover.calledWithExactly(props.index)).toBeTruthy();
    });
});
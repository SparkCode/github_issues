import {shallow} from "enzyme";
import OptionsList from "./OptionsList";
import React from "react";
import sinon from "sinon";
import renderer from 'react-test-renderer';


describe("<OptionsList/>", () => {
    const defaultProps = {
        options: ["a", "b", "c", "d"],
        focusedOptionIndex: 2,
        isInputHasFocus: false,
        onOptionsListHoverOut: () => {},
        onOptionHover: () => {}
    };

    const setup = (propsOverrides) => {
        const props = {...defaultProps, ...propsOverrides};
        const wrapper = shallow(<OptionsList {...props}/>);

        return {
            wrapper,
            props,
            optionsListElement: wrapper.find(".autocomplete-options")
        }
    };

    it("should render without crashing when required props be provided", () => {
        setup();
    });

    it("should render correctly", () => {
        const tree = renderer.create(<OptionsList {...defaultProps}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render list element with autocomplete-options-unseen class, when isInputHasFocus is false", () => {
        const {optionsListElement} = setup({isInputHasFocus: false});
        expect(optionsListElement.hasClass("autocomplete-options_unseen")).toBeTruthy();
    });

    it("should render list element without autocomplete-options-unseen class, when isInputHasFocus is true", () => {
        const {optionsListElement} = setup({isInputHasFocus: true});
        expect(optionsListElement.hasClass("autocomplete-options_unseen")).toBeFalsy();
    });

    it("should call onOptionsListHoverOut callback when onMouseLeave event is fire for options list element", () => {
        const onOptionsListHoverOut = sinon.spy();
        const {optionsListElement} = setup({isInputHasFocus: true, onOptionsListHoverOut});
        optionsListElement.simulate("mouseleave");
        expect(onOptionsListHoverOut.calledOnce).toBeTruthy();
    });

    it("should render only single Option with true isSelected attribute, when focusedOptionIndex is not -1", () => {
        const {optionsListElement} = setup({focusedOptionIndex: 2});
        expect(optionsListElement.children().findWhere(el => el.prop("isSelected"))).toHaveLength(1);
    });


    it("should render no Options with true isSelected attribute, when focusedOptionIndex is -1", () => {
        const {optionsListElement} = setup({focusedOptionIndex: -1});
        expect(optionsListElement.children().findWhere(el => el.prop("isSelected"))).toHaveLength(0);
    })
});
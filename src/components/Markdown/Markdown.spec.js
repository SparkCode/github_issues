import {shallow} from "enzyme";
import React from "react";
import Markdown from "./Markdown";

describe("<Markdown/>", () => {
    const defaultProps = {
        text: "Just a minor sentence fix in the readme"
    };

    const setup = (prorsOverrides) => {
        const props = {...defaultProps, ...prorsOverrides};
        const wrapper = shallow(<Markdown {...props}/>);

        return {
            wrapper,
            props
        }
    };

    it("should render without crashing", () => {
        setup();
    });

    it("should render with class", () => {
        const className = "class";
        const {wrapper} = setup({className});
        expect(wrapper.hasClass(className)).toBeTruthy();
    })
});
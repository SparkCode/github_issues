import {shallow} from "enzyme";
import Link from "./Link";
import React from "react";
describe("<Link/>", () => {
    const defaultProps = {};

    const setup = (propsOverrides) => {
        const props = {...defaultProps, ...propsOverrides};
        const wrapper = shallow(<Link {...props}/>);

        return {
            props,
            wrapper
        }
    };

    it("should render without crashing", () => {
        setup();
    });

    it("should render with class", () => {
        const className = "active-link";
        const {wrapper} = setup({className: className});
        expect(wrapper.hasClass(className)).toBeTruthy();
    })
});
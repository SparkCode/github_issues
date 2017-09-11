import sinon from "sinon";
import {shallow} from "enzyme";
import React from "react";
import PageButton from "./PageButton";

describe("<PageButton/>", () => {
    const defaultProps = {
        value: "10"
    };

    beforeEach(() => {
        defaultProps.gotoNewPage = sinon.spy()
    });

    const setup = (propsOverrides) => {
        const props = {...defaultProps, ...propsOverrides};
        const wrapper = shallow(<PageButton {...props}/>);

        return {
            props,
            wrapper
        }
    };

    it("should render without crashes", () => {
        setup();
    });

    it("should render with class, when class is provided", () => {
        const className = "page-button-class";
        const {wrapper} = setup({className});
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it("should call gotoNewPage callback with value arg when button be clicked", () => {
        const {props, wrapper} = setup();
        wrapper.simulate("click");
        expect(props.gotoNewPage.calledOnce && props.gotoNewPage.calledWithExactly(props.value)).toBeTruthy();
    });
});
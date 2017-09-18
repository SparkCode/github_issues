import React from "react";
import {shallow} from "enzyme";

export const componentSetup = (Component, defaultProps={}, propsOverrides={}) => {
    const props = {...defaultProps, ...propsOverrides};
    const wrapper = shallow(<Component {...props}/>);

    return {
        wrapper,
        props
    }
};
import {shallow} from "enzyme";
import Button from "./Button";
import React from "react";

describe("<Button/>", () => {
    it('should render without crashing', () => {
        shallow(<Button/>)
    });

    it('should render with class', () => {
        const className = "big-button";
        const component = shallow(<Button className={className}/>);
        expect(component.hasClass(className)).toBeTruthy();
    });
});
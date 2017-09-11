import sinon from "sinon";
import {shallow} from "enzyme";
import React from "react";
import Paging from "./Paging";

describe("<Paging/>", () => {
    const defaultProps = {
       pagesNumber: 5,
       currentPage: 0,
       maxVisiblePagesFromEachSide: 1
    };

    beforeEach(() => {
       defaultProps.gotoNewPage = sinon.spy()
    });

    const setup = (propsOverrides) => {
        const props = {...defaultProps, ...propsOverrides};
        const wrapper = shallow(<Paging {...props}/>);

        return {
            wrapper,
            props
        }
    };

    it("should render without crashing", () => {
        setup();
    });
});
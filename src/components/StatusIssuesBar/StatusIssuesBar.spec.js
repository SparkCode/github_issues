import StatusIssuesBar from "./StatusIssuesBar";
import React from "react";
import {componentSetup} from "../../utils/ComponentTest";

describe("<StatusIssuesBar/>", () => {
   const defaultProps = {
       issuesBeReceived: false,
       issuesIsLoading: false,
       isRequestFailed: false,
       noIssueHave : false,
   };

    const setup = (propsOverrides) => componentSetup(StatusIssuesBar, defaultProps, propsOverrides);

    it("should render without crashing", () => {
        setup();
    });

    it("should render with class", () => {
        const className = "search-issues-class";
        const {wrapper} = setup({className});
        expect(wrapper.hasClass(className)).toBeTruthy();
    });

    it("should render errorMessage when isRequestFailed is true", () => {
        const {wrapper, props} = setup({
            isRequestFailed: true,
            errorMessage: "message"});
        expect(wrapper.children().contains(props.errorMessage)).toBeTruthy();
    });

    it("should render noIssuesBeReceivedMessage when no issues is received without request error", () => {
        const {props, wrapper} = setup({
            isRequestFailed: false,
            issuesBeReceived: true,
            noIssueHave: true,
            noIssuesBeReceivedMessage: "message"});
        expect(wrapper.children().contains(props.noIssuesBeReceivedMessage)).toBeTruthy();
    });

    it("should render issuesIsLoadingMessage when issues is loading", () => {
        const {props, wrapper} = setup({
            isRequestFailed: false,
            issuesBeReceived: false,
            noIssueHave: false,
            issuesIsLoading: true,
            issuesIsLoadingMessage: "message"});
        expect(wrapper.children().contains(props.issuesIsLoadingMessage)).toBeTruthy();
    })

});
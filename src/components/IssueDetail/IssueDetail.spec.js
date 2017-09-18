import IssueDetail from "./IssueDetail";
import React from "react";
import {componentSetup} from "../../utils/ComponentTest";

describe("<IssueDetail/>", () => {
    const defaultProps = {
        title: `Fix sentence in "Injecting Custom Argument" in readme`,
        number: 10,
        state: "open",
        userLogin: "alex",
        createdAt: "2017-07-03T12:08:08Z",
        issueUrl: "https://api.github.com/repos/gaearon/redux-thunk/issues/145",
        userUrl: "https://github.com/RichoDemus",
        userAvatarUrl: "https://avatars1.githubusercontent.com/u/1078462?v=4",
        body: "Just a minor sentence fix in the readme"
    };

    it("should render without crashing", () => {
        componentSetup(IssueDetail, defaultProps);
    });
});
import issues from "./issues";
import * as constants from "../actionCreators/constants";

describe("Issue", () => {
    const initState = {
        didInvalidate: true,
        isFething:false,
        isRequestFailed:false,
        errorMessage:"",
        data: [],
        paging:{
            issuesCountOptions: ["10", "20", "30", "50", "100"],
            defaultIssuesCountOption: "20"
        }
    };

    it("should return the init state", () => {
        expect(issues(undefined, {})).toEqual(initState);
    });

    it('should not affect state', () => {
        expect(issues(undefined, {type: 'NOT_EXISTING'})).toEqual(initState);
    });

    it('should handle INVALIDATE_ISSUES', () => {
        const originalState =
            {
                ...initState,
                didInvalidate: false,
                data: [{id: 1}, {id: 2}, {id: 5}]
            };
        const expectedState = initState;
        expect(issues(originalState, {type: constants.INVALIDATE_ISSUES})).toEqual(expectedState);
    });

    it('should handle REQUEST_ISSUES', () => {
        const originalState = initState;
        const expectedState = {...initState, didInvalidate: false, isFething: true};
        expect(issues(originalState, {type: constants.REQUEST_ISSUES})).toEqual(expectedState);
    });

    it('should handle RECEIVE_ISSUES', () => {
        const originalState =
            {
                ...initState,
                data: [{id: 1}, {id: 2}, {id: 5}],
                isFething: true,
                didInvalidate: false
            };
        const newIssues =
            [
                {id: 7},
                {id: 8},
                {id: 9}
            ];
        const expectedState =
            {
                ...originalState,
                isFething: false,
                data: [...originalState.data, ...newIssues]
            };
        expect(issues(originalState, {type: constants.RECEIVE_ISSUES, issues: newIssues})).toEqual(expectedState);
    });

    it('should handle RECEIVE_ISSUES_ERROR', () => {
        const originalState =
            {
                ...initState,
                data: [{id: 1}, {id: 2}, {id: 5}],
                isFething: true,
                didInvalidate: false
            };
        const errorMessage = "Message";
        const expectedState =
            {
                ...originalState,
                isFething: false,
                isRequestFailed: true,
                errorMessage: errorMessage
            };
        expect(issues(originalState, {type: constants.RECEIVE_ISSUES_ERROR, errorMessage})).toEqual(expectedState);
    });

    it("should handle RECEIVE_ISSUES_PAGES_COUNT", () => {
        const originalState = initState;
        const issuesPagesCount = 5;
        const expectedState = {...initState, paging: {...originalState.paging, issuesPagesCount}};
        expect(issues(originalState, {type: constants.RECEIVE_ISSUES_PAGES_COUNT, issuesPagesCount}))
            .toEqual(expectedState);
    })
});
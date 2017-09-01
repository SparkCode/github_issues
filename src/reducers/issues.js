import {INVALIDATE_ISSUES, RECEIVE_ISSUES, RECEIVE_ISSUES_ERROR, RECEIVE_ISSUES_PAGES_COUNT, REQUEST_ISSUES}
    from "../actionCreators";

const data = (state, action) => {
    switch (action.type) {
        case RECEIVE_ISSUES: {
            return [...action.issues];
        }
        case INVALIDATE_ISSUES: {
            return [];
        }
        default: return state;
    }
};

const paging =  (state, action) => {
    switch (action.type) {
        case RECEIVE_ISSUES_PAGES_COUNT: {
            return {...state, issuesPagesCount: action.issuesPagesCount};
        }

        case INVALIDATE_ISSUES: {
            return {...state, issuesPagesCount: null};
        }

        default: return state;
    }
};

const defaultIssuesState = {
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

const issues = (state=defaultIssuesState, action) => {
    switch  (action.type) {
        case INVALIDATE_ISSUES: {
            return {
                ...state,
                didInvalidate: true,
                data: data(state.data, action),
                isRequestFailed: false,
                errorMessage: "",
                paging: paging(state.paging, action)
            };
        }

        case REQUEST_ISSUES: {
            return {
                ...state,
                didInvalidate: false,
                isFething: true};
        }

        case RECEIVE_ISSUES: {
            return {
                ...state,
                isFething: false,
                data: data(state.data, action),
                paging: paging(state.paging, action)};
        }

        case RECEIVE_ISSUES_ERROR: {
            return {
                ...state,
                isFething: false,
                isRequestFailed: true,
                errorMessage: action.errorMessage,
                data: data(state.data, action),
                paging: paging(state.paging, action)};
        }

        case RECEIVE_ISSUES_PAGES_COUNT: {
            return {
                ...state,
                paging: paging(state.paging, action)}
        }
        default:
            return state;
    }
};

export default issues;
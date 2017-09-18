import  * as constants from "../actionCreators";

const data = (state, action) => {
    switch (action.type) {
        case constants.RECEIVE_ISSUES: {
            return [...state, ...action.issues];
        }
        case constants.INVALIDATE_ISSUES: {
            return [];
        }
        default: return state;
    }
};

const paging =  (state, action) => {
    switch (action.type) {
        case constants.RECEIVE_ISSUES_PAGES_COUNT: {
            return {...state, issuesPagesCount: action.issuesPagesCount};
        }

        case constants.INVALIDATE_ISSUES: {
            return {...state, issuesPagesCount: undefined};
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
        case constants.INVALIDATE_ISSUES: {
            return {
                ...state,
                didInvalidate: true,
                data: data(state.data, action),
                isRequestFailed: false,
                errorMessage: "",
                paging: paging(state.paging, action)
            };
        }

        case constants.REQUEST_ISSUES: {
            return {
                ...state,
                didInvalidate: false,
                isFething: true};
        }

        case constants.RECEIVE_ISSUES: {
            return {
                ...state,
                isFething: false,
                data: data(state.data, action),
                paging: paging(state.paging, action)};
        }

        case constants.RECEIVE_ISSUES_ERROR: {
            return {
                ...state,
                isFething: false,
                isRequestFailed: true,
                errorMessage: action.errorMessage,
                data: data(state.data, action),
                paging: paging(state.paging, action)};
        }

        case constants.RECEIVE_ISSUES_PAGES_COUNT: {
            return {
                ...state,
                paging: paging(state.paging, action)}
        }
        default:
            return state;
    }
};

export default issues;
import {INVALIDATE_ISSUES, RECEIVE_ISSUES} from "../actionCreators/constants";

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
        case RECEIVE_ISSUES: {
            return {...state, issuesPagesCount: action.issuesPagesCount};
        }

        case INVALIDATE_ISSUES: {
            return {...state, issuesPagesCount: null};
        }

        default: return state;
    }
};

const issues = (state= {didInvalidate: true,
                        data: [],
                        paging:{
                            issuesCountOptions: ["10", "20", "30", "50", "100"],
                            defaultIssuesCountOption: "20"
                        }},
                action) => {
    switch  (action.type) {
        case INVALIDATE_ISSUES: {
            return {...state, didInvalidate: true, data: data(state.data, action), paging: paging(state.paging, action)};
        }
        case RECEIVE_ISSUES: {
            return {...state, didInvalidate: false, data: data(state.data, action), paging: paging(state.paging, action)};
        }
        default:
            return state;
    }
};

export default issues;
import {INVALIDATE_ISSUES, RECEIVE_ISSUES} from "../actionCreators/constants";
const data = (state, action) => {
    switch (action.type) {
        case RECEIVE_ISSUES: {
            return [...action.issues];
        }
        default: return state;
    }
};

const issues = (state={didInvalidate: true, data: []}, action) => {
    switch  (action.type) {
        case INVALIDATE_ISSUES: {
            return {...state, didInvalidate: true};
        }
        case RECEIVE_ISSUES: {
            return {...state, didInvalidate: false, data: data(state, action)};
        }
        default:
            return state;
    }
};

export default issues;
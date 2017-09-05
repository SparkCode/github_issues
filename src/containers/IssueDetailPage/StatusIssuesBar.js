import {connect} from "react-redux";
import {StatusIssuesBar} from "../../components/StatusIssuesBar";

const mapStateToProps = (state) => { //todo: DRY?
    const {data, didInvalidate, isFething, isRequestFailed, errorMessage} = state.issues;
    return {
        issuesBeReceived: !didInvalidate && !isFething,
        issuesIsLoading: isFething,
        isRequestFailed,
        errorMessage,
        noIssuesBeLoaded: data.length === 0
    }
};

export default connect(mapStateToProps)(StatusIssuesBar);
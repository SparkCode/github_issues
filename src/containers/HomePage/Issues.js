import {connect} from "react-redux";
import {fetchIssuesIfNeeded} from "../../actionCreators";
import Issues from "../../components/HomePage/Issues";

const mapStateToProps = (state) => {
    const {data, didInvalidate, isFething} = state.issues;
    return {
        issues: data,
        issuesBeLoaded: !didInvalidate && !isFething
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchIssuesIfNeeded: () => dispatch(fetchIssuesIfNeeded(ownProps.query))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
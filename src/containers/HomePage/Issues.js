import {connect} from "react-redux";
import {fetchIssuesIfNeeded} from "../../actionCreators";
import Issues from "../../components/HomePage/Issues";

const mapStateToProps = (state) => {
    return {
        issues: state.issues.data
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchIssuesIfNeeded: () => dispatch(fetchIssuesIfNeeded(ownProps.query))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
import {fetchIssuesIfNeeded} from "../../actionCreators/actionCreators";
import Issues from "../../components/HomePage/Issues";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        issues: state.issues.data
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchIssuesIfNeeded: () => dispatch(fetchIssuesIfNeeded(ownProps.location))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Issues);
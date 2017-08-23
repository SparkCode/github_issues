import {searchIssues} from "../../actionCreators"
import {connect} from "react-redux";
import Search from "../../components/HomePage/Search";

const mapStateToProps = (state, ownProps) => {
    const {issuesCountOptions} = state.issues.paging;
    const {userName, repoName, issuesCount} = ownProps.query;
    return {
        issuesCountOptions,
        defaultRepoName: repoName,
        defaultUserName: userName,
        defaultIssuesCount: issuesCount
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearch: (userName, repoName, issuesCount) => {
            dispatch(searchIssues({...ownProps.query, userName, repoName, issuesCount, pageNumber: 1}));

        }
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Search);
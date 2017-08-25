import {searchIssues} from "../../actionCreators"
import {connect} from "react-redux";
import Search from "../../components/HomePage/Search";
import {loadUserRepositories, InvalidateUserRepos} from "../../actionCreators";

const mapStateToProps = (state, ownProps) => {
    const {issuesCountOptions} = state.issues.paging;
    const {userRepositories} = state;
    const {userName, repoName, issuesCount} = ownProps.query;
    return {
        issuesCountOptions,
        userRepositories,
        defaultRepoName: repoName,
        defaultUserName: userName,
        defaultIssuesCount: issuesCount
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearch: (userName, repoName, issuesCount) => {
            dispatch(searchIssues({...ownProps.query, userName, repoName, issuesCount, pageNumber: 1}));
        },
        loadReposByUserName: (userName, queryString) => {
            dispatch(loadUserRepositories(userName, queryString));

        }
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Search);
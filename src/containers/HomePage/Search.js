import {searchIssues} from "../../actionCreators"
import {connect} from "react-redux";
import Search from "../../components/SearchIssues";
import {loadUserRepositories} from "../../actionCreators";

const mapStateToProps = (state, ownProps) => {
    const {issuesCountOptions} = state.issues.paging;
    const {userRepositories} = state;
    const {defaultUserName, defaultRepoName, defaultIssuesCount} = ownProps;
    return {
        issuesCountOptions,
        userRepositories,
        defaultRepoName,
        defaultUserName,
        defaultIssuesCount
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (userName, repoName, issuesCount) => {
            dispatch(searchIssues({userName, repoName, issuesCount, pageNumber: 1}));
        },
        searchReposByUserName: (userName, queryString) => {
            dispatch(loadUserRepositories(userName, queryString));
        }
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Search);
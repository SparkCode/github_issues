import {searchIssues} from "../../actionCreators"
import {connect} from "react-redux";
import Search from "../../components/SearchIssues";
import {loadUserRepositories} from "../../actionCreators";

const mapStateToProps = (state, ownProps) => { //todo: DRY?
    const {issuesCountOptions, defaultIssuesCountOption} = state.issues.paging;
    const {userRepositories} = state;
    const {defaultUserName, defaultRepoName} = ownProps;
    return {
        issuesCountOptions,
        userRepositories,
        defaultRepoName,
        defaultUserName,
        defaultIssuesCount: defaultIssuesCountOption //todo: need to get defaultIssuesCount from previous page
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
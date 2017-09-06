import {searchIssues} from "../../actionCreators"
import {connect} from "react-redux";
import {loadUserRepositories} from "../../actionCreators";
import SearchIssues from "../../components/SearchIssues";
import bindActionCreators from "redux/es/bindActionCreators";

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
        searchReposByUserName: bindActionCreators(loadUserRepositories, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(SearchIssues);
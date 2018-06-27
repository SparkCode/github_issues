import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchIssues from '../../components/SearchIssues';
import { searchIssues, loadUserRepositories } from '../../actionCreators';
import { selectPaging, selectUserRepositories } from 'selectors';

const mapStateToProps = (immutableState, ownProps) => {
  const { issuesCountOptions } = selectPaging(immutableState);
  const userRepositories = selectUserRepositories(immutableState);
  const { defaultUserName, defaultRepoName, defaultIssuesCount } = ownProps;
  return {
    issuesCountOptions,
    userRepositories,
    defaultRepoName,
    defaultUserName,
    defaultIssuesCount,
  };
};

const mapDispatchToProps = dispatch => ({
  onSearch: (userName, repoName, issuesCount) => {
    dispatch(
      searchIssues({
        userName,
        repoName,
        issuesCount,
        pageNumber: 1,
      }),
    );
  },
  searchReposByUserName: bindActionCreators(loadUserRepositories, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchIssues);

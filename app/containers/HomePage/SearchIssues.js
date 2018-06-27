import SearchIssues from 'components/SearchIssues';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchIssues, loadUserRepositories } from 'actionCreators';
import { selectUserRepositories, selectIssuesCountOptions } from 'selectors';

const mapStateToProps = state => ({
  issuesCountOptions: selectIssuesCountOptions(state),
  userRepositories: selectUserRepositories(state),
});

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

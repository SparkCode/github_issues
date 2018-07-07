import IssuesSearch from 'components/IssuesSearch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IssuesSearch as IssuesSearchAction, loadUserRepositories } from 'actionCreators';
import { selectUserRepositories, selectIssuesCountOptions } from 'selectors/index';

const mapStateToProps = state => ({
  issuesCountOptions: selectIssuesCountOptions(state),
  userRepositories: selectUserRepositories(state),
});

const mapDispatchToProps = dispatch => ({
  onSearch: (userName, repoName, issuesCount) => {
    dispatch(
      IssuesSearchAction({
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
)(IssuesSearch);

import { searchIssues } from 'actionCreators';
import { connect } from 'react-redux';
import Paging from 'components/Paging';
import { selectIssuesPagesCount } from 'selectors';

const mapStateToProps = state => ({
  pagesNumber: selectIssuesPagesCount(state),
});

const mapDispatchToProps = (dispatch, { repoName, userName, issuesCount }) => ({
  gotoNewPage: pageNumber => {
    dispatch(searchIssues({ repoName, userName, issuesCount, pageNumber }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Paging);

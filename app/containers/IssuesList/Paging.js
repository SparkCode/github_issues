import { IssuesSearch } from 'actionCreators';
import { connect } from 'react-redux';
import Paging from 'components/Paging';
import { selectIssuesPagesCount } from 'selectors/index';

const mapStateToProps = state => ({
  pagesNumber: selectIssuesPagesCount(state),
});

const mapDispatchToProps = (dispatch, { repoName, userName, issuesCount }) => ({
  goToNewPage: pageNumber => {
    dispatch(IssuesSearch({ repoName, userName, issuesCount, pageNumber }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Paging);

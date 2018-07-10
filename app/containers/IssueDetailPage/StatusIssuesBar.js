import { connect } from 'react-redux';
import StatusIssuesBar from 'components/StatusIssuesBar';
import { IssueDetailPage } from './selectors';

// todo: code duplication
const mapStateToProps = state => {
  const { isFetching, isRequestFailed, errorMessage } = IssueDetailPage(state);
  return {
    issuesIsLoading: isFetching,
    isRequestFailed,
    errorMessage,
    noIssuesReceived: false,
  };
};

export default connect(mapStateToProps)(StatusIssuesBar);

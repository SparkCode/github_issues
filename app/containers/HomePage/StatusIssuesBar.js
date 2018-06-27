import { connect } from 'react-redux';
import StatusIssuesBar from '../../components/StatusIssuesBar';
import { selectIssues } from 'selectors';

const mapStateToProps = immutableState => {
  const {
    data,
    didInvalidate,
    isFetching,
    isRequestFailed,
    errorMessage,
  } = selectIssues(immutableState);
  return {
    issuesBeReceived: !didInvalidate && !isFetching,
    issuesIsLoading: isFetching,
    isRequestFailed,
    errorMessage,
    noIssueHave: data.length === 0,
  };
};

export default connect(mapStateToProps)(StatusIssuesBar);

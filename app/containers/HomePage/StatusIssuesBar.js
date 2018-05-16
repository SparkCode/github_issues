import { connect } from 'react-redux';
import StatusIssuesBar from '../../components/StatusIssuesBar';

const mapStateToProps = (immutableState) => {
  const state = immutableState.toJS();
  const {
    data,
    didInvalidate,
    isFetching,
    isRequestFailed,
    errorMessage,
  } = state.home.issues;
  return {
    issuesBeReceived: !didInvalidate && !isFetching,
    issuesIsLoading: isFetching,
    isRequestFailed,
    errorMessage,
    noIssueHave: data.length === 0,
  };
};

export default connect(mapStateToProps)(StatusIssuesBar);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { fetchIssueIfNeeded } from '../../actionCreators';
import { connect } from 'react-redux';
import IssueDetail from './IssueDetail';

class IssueDetailPage extends PureComponent {
  componentDidMount() {
    const { fetchIssueIfNeeded } = this.props;
    fetchIssueIfNeeded();
  }

  componentWillReceiveProps() {
    const { fetchIssueIfNeeded } = this.props;
    fetchIssueIfNeeded();
  }

  render() {
    const { issueBeLoaded, issueNumber } = this.props;
    const b = block('issue-page');
    return (
      <div className={b()}>
        {issueBeLoaded && <IssueDetail issueNumber={+issueNumber} />}
      </div>
    );
  }
}

IssueDetailPage.propTypes = {
  fetchIssueIfNeeded: PropTypes.func.isRequired,
  issueNumber: PropTypes.string,
  issueBeLoaded: PropTypes.bool.isRequired,
};
IssueDetailPage.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  const { didInvalidate, isFetching, isRequestFailed } = state.toJS().home.issues;
  const { issueNumber, userName, repoName } = ownProps.match.params;
  const issueBeLoaded = !didInvalidate && !isFetching && !isRequestFailed;
  return {
    issueBeLoaded,
    issueNumber,
    userName,
    repoName,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { userName, repoName, issueNumber } = ownProps.match.params;
  return {
    fetchIssueIfNeeded: () =>
      dispatch(fetchIssueIfNeeded({ userName, repoName, issueNumber })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailPage);

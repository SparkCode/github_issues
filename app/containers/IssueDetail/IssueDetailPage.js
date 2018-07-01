// todo: 'IssueDetailPage' should be renamed
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { fetchIssueIfNeeded as fetchIssueIfNeededAction } from 'actionCreators';
import { connect } from 'react-redux';
import { selectIsIssuesSuccessfullyBeLoaded } from 'selectors/index';
import { compose, withProps } from 'recompose';
import IssueDetail from './IssueDetail';

class IssueDetailPage extends PureComponent {
  componentDidMount() {
    const { fetchIssueIfNeeded } = this.props;
    fetchIssueIfNeeded();
  }

  componentDidUpdate() {
    const { fetchIssueIfNeeded } = this.props;
    fetchIssueIfNeeded();
  }

  render() {
    const { issueBeLoaded, issueNumber } = this.props;
    const b = block('issue-page');
    return <div className={b()}>{issueBeLoaded && <IssueDetail issueNumber={issueNumber} />}</div>;
  }
}

// todo: rewrite it for namespace
IssueDetailPage.propTypes = {
  fetchIssueIfNeeded: PropTypes.func.isRequired,
  issueNumber: PropTypes.number,
  issueBeLoaded: PropTypes.bool.isRequired,
};
IssueDetailPage.defaultProps = {};

const mapStateToProps = state => ({
  issueBeLoaded: selectIsIssuesSuccessfullyBeLoaded(state),
});

const mapDispatchToProps = (dispatch, { userName, repoName, issueNumber }) => ({
  fetchIssueIfNeeded: () => dispatch(fetchIssueIfNeededAction({ userName, repoName, issueNumber })),
});

const withIssueNumber = withProps(({ match: { params: { issueNumber } } }) => ({
  issueNumber: Number.parseInt(issueNumber, 10),
}));

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withIssueNumber,
  withConnect,
)(IssueDetailPage);

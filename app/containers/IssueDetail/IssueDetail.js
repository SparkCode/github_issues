import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import withRouteParams from 'containers/App/withRouteParams';
import injectReducer from 'utils/injectReducer';
import IssueDetail from 'components/IssueDetail';
import reducer from './reducer';
import StatusIssuesBar from './StatusIssuesBar';
import { selectIsIssueSuccessfullyBeLoaded, selectIssue } from './selectors';
import './IssueDetail.scss';
import { fetchIssueIfNeeded as fetchIssueIfNeededAction } from './actions';

class IssueDetailPage extends PureComponent {
  componentDidMount() {
    const { fetchIssueIfNeeded } = this.props;
    fetchIssueIfNeeded();
  }

  render() {
    const { issueBeLoaded, issue } = this.props;
    const b = block('issue-detail-page');
    return (
      <div className={b()}>
        <StatusIssuesBar className={b('status')()} />
        {issueBeLoaded && <IssueDetail {...issue} />}
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'issueDetailPage', reducer });

IssueDetailPage.propTypes = {
  fetchIssueIfNeeded: PropTypes.func.isRequired,
  issue: PropTypes.object.isRequired,
  issueBeLoaded: PropTypes.bool.isRequired,
};
IssueDetailPage.defaultProps = {};

const mapStateToProps = (state, { issueNumber }) => ({
  issueBeLoaded: selectIsIssueSuccessfullyBeLoaded(state),
  issue: selectIssue(state, issueNumber),
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
  withReducer,
  withRouteParams,
  withIssueNumber,
  withConnect,
)(IssueDetailPage);

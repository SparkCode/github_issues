import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';
import withRouteParams from 'containers/App/withRouteParams';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import StatusIssuesBar from './StatusIssuesBar';
import { selectIsIssueSuccessfullyBeLoaded } from './selectors';
import './IssueDetailPage.scss';
import { fetchIssueIfNeeded as fetchIssueIfNeededAction } from './actions';
import IssueDetail from './IssueDetail';

class IssueDetailPage extends PureComponent {
  componentDidMount() {
    const { fetchIssueIfNeeded } = this.props;
    fetchIssueIfNeeded();
  }

  render() {
    const { issueBeLoaded, issueNumber } = this.props;
    const b = block('issue-detail-page');
    return (
      <div className={b()}>
        <StatusIssuesBar className={b('status')()} />
        {issueBeLoaded && <IssueDetail issueNumber={issueNumber} />}
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'issueDetailPage', reducer });

IssueDetailPage.propTypes = {
  fetchIssueIfNeeded: PropTypes.func.isRequired,
  issueNumber: PropTypes.number,
  issueBeLoaded: PropTypes.bool.isRequired,
};
IssueDetailPage.defaultProps = {};

const mapStateToProps = state => ({
  issueBeLoaded: selectIsIssueSuccessfullyBeLoaded(state),
});

const mapDispatchToProps = (dispatch, { userName, repoName, issueNumber }) => ({
  fetchIssueIfNeeded: () => dispatch(fetchIssueIfNeededAction({ userName, repoName, issueNumber })),
  // onIssuesSearch: () => dispatch(invalidateIssues()), TODO:
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

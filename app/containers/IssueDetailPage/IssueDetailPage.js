import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { selectIsIssuesSuccessfullyBeLoaded } from 'containers/IssuesListPage/selectors'; // todo: it's temporary solution, make some own boilerplate
import { compose, withProps } from 'recompose';
import withRouteParams from 'containers/App/withRouteParams';
import IssuesSearch from 'containers/IssuesSearch';
import reducer from 'containers/IssuesListPage/reducer'; // todo: it's temporary solution, make some own boilerplate
import injectReducer from 'utils/injectReducer';
import { invalidateIssues } from 'containers/IssuesListPage/actions'; // todo: it's temporary solution, make some own boilerplate
import StatusIssuesBar from 'containers/StatusIssuesBar';
import { fetchIssueIfNeeded as fetchIssueIfNeededAction } from './actions';
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
    const { issueBeLoaded, issueNumber, userName, repoName, issuesCount, onIssuesSearch } = this.props;
    const b = block('issue-detail-page');
    return (
      <div className={b()}>
        <IssuesSearch
          className={b('search')()}
          defaultUserName={userName}
          defaultRepoName={repoName}
          defaultIssuesCount={issuesCount}
          onSearch={onIssuesSearch}
        />
        <StatusIssuesBar />
        {issueBeLoaded && <IssueDetail issueNumber={issueNumber} />}
      </div>
    );
  }
}

const withReducer = injectReducer({ key: 'issueDetailPage', reducer }); // todo: need to be refactor

IssueDetailPage.propTypes = {
  fetchIssueIfNeeded: PropTypes.func.isRequired,
  onIssuesSearch: PropTypes.func.isRequired,
  issueNumber: PropTypes.number,
  issueBeLoaded: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  repoName: PropTypes.string.isRequired,
  issuesCount: PropTypes.string,
};
IssueDetailPage.defaultProps = {};

const mapStateToProps = state => ({
  issueBeLoaded: selectIsIssuesSuccessfullyBeLoaded(state),
});

const mapDispatchToProps = (dispatch, { userName, repoName, issueNumber }) => ({
  fetchIssueIfNeeded: () => dispatch(fetchIssueIfNeededAction({ userName, repoName, issueNumber })),
  onIssuesSearch: () => dispatch(invalidateIssues()),
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

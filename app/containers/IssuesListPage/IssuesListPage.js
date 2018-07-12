import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';
import { compose } from 'redux';
import withRouteParams from 'containers/App/withRouteParams';
import injectReducer from 'utils/injectReducer';
import StatusIssuesBar from './StatusIssuesBar';
import './IssuesListPage.scss';
import { selectIssuesData, selectIssuesPagesCount } from './selectors';
import { fetchIssuesIfNeeded as fetchIssuesIfNeededActionCreator } from './actions';
import reducer from './reducer';
import IssuesList from './IssuesList';
import Paging from './Paging';
import { withValidIssuesCount } from '../IssuesSearch/IssuesSearch';

class IssuesListPage extends PureComponent {
  componentDidMount() {
    const { fetchIssuesIfNeeded } = this.props;
    fetchIssuesIfNeeded();
  }

  componentDidUpdate() {
    const { fetchIssuesIfNeeded } = this.props;
    fetchIssuesIfNeeded();
  }

  render() {
    const { issuesCount, pageNumber, shouldShowPaging, repoName, userName } = this.props;
    const b = block('issues-list-page');
    return (
      <div className={b()}>
        <StatusIssuesBar className={b('status')()} />
        <IssuesList repoName={repoName} userName={userName} issuesCount={issuesCount} />
        {shouldShowPaging && (
          <Paging repoName={repoName} userName={userName} currentPage={pageNumber} issuesCount={issuesCount} />
        )}
      </div>
    );
  }
}

IssuesListPage.propTypes = {
  fetchIssuesIfNeeded: PropTypes.func.isRequired,
  shouldShowPaging: PropTypes.bool.isRequired,
  issuesCount: PropTypes.string.isRequired,
  repoName: PropTypes.string,
  userName: PropTypes.string,
  pageNumber: PropTypes.number,
};

const withReducer = injectReducer({ key: 'issuesListPage', reducer }); // todo: need to be refactor

const withConnect = connect(
  state => ({
    issuesPagesCount: selectIssuesPagesCount(state),
    issues: selectIssuesData(state),
  }),
  (dispatch, { userName, repoName, issuesCount, pageNumber }) => ({
    fetchIssuesIfNeeded: () =>
      dispatch(fetchIssuesIfNeededActionCreator({ userName, repoName, issuesCount, pageNumber })),
    // onIssuesSearch: () => dispatch(invalidateIssues()), TODO:
  }),
);

const withIssuesListProps = withProps(({ issuesPagesCount, issues, pageNumber }) => {
  const parsedPageNumber = Number.parseInt(pageNumber, 10);
  return {
    pageNumber:
      Number.isInteger(issuesPagesCount) &&
      Number.isInteger(parsedPageNumber) &&
      parsedPageNumber > 0 &&
      parsedPageNumber <= issuesPagesCount
        ? parsedPageNumber
        : 1,
    shouldShowPaging: Number.isInteger(issuesPagesCount) && issuesPagesCount > 1 && issues.length > 1,
  };
});

export default compose(
  withReducer,
  withRouteParams,
  withValidIssuesCount,
  withConnect,
  withIssuesListProps,
)(IssuesListPage);

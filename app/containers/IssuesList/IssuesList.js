import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { lifecycle, withHandlers, withProps } from 'recompose';
import { compose } from 'redux';
import withRouteParams from 'containers/App/withRouteParams';
import injectReducer from 'utils/injectReducer';
import IssuesList from 'components/IssuesList';
import Paging from 'components/Paging';
import { makeIssuesListUrl, makeIssueUrl } from 'containers/GithubIssuesPage/navigation';
import StatusIssuesBar from './StatusIssuesBar';
import './IssuesList.scss';
import { selectIssuesData, selectIssuesPagesCount } from './selectors';
import {
  fetchIssuesIfNeeded as fetchIssuesIfNeededActionCreator,
  invalidateIssues as invalidateIssuesAction,
} from './actions';
import reducer from './reducer';
// todo: looks like default values need to store no here
import { withValidIssuesCountOnPage } from '../IssuesSearch/IssuesSearch';

class IssuesListContainer extends PureComponent {
  componentDidMount() {
    const { fetchIssuesIfNeeded } = this.props;
    fetchIssuesIfNeeded();
  }

  componentDidUpdate() {
    const { fetchIssuesIfNeeded } = this.props;
    fetchIssuesIfNeeded();
  }

  render() {
    const {
      pageNumber,
      shouldShowPaging,
      repoName,
      userName,
      issues,
      onIssueTitleClick,
      makeIssueUrlByNumber,
      goToNewPage,
      issuesPagesCount,
      makePageUrlByNumber,
    } = this.props;
    const b = block('issues-list-page');
    return (
      <div className={b()}>
        <StatusIssuesBar className={b('status')()} />
        <IssuesList
          repoName={repoName}
          userName={userName}
          issues={issues}
          onIssueTitleClick={onIssueTitleClick}
          makeIssueUrlByNumber={makeIssueUrlByNumber}
        />
        {shouldShowPaging && (
          <Paging
            currentPage={pageNumber}
            goToNewPage={goToNewPage}
            pagesNumber={issuesPagesCount}
            makePageUrlByNumber={makePageUrlByNumber}
          />
        )}
      </div>
    );
  }
}

// todo: seems issuesCountOnPage need to be validated
IssuesListContainer.propTypes = {
  fetchIssuesIfNeeded: PropTypes.func.isRequired,
  shouldShowPaging: PropTypes.bool.isRequired,
  issues: PropTypes.array.isRequired,
  onIssueTitleClick: PropTypes.func.isRequired,
  makeIssueUrlByNumber: PropTypes.func.isRequired,
  goToNewPage: PropTypes.func.isRequired,
  makePageUrlByNumber: PropTypes.func.isRequired,
  issuesPagesCount: PropTypes.number,
  repoName: PropTypes.string,
  userName: PropTypes.string,
  pageNumber: PropTypes.number,
};

const withReducer = injectReducer({ key: 'issuesList', reducer });

const withConnect = connect(
  state => ({
    issuesPagesCount: selectIssuesPagesCount(state),
    issues: selectIssuesData(state),
  }),
  (dispatch, { userName, repoName, issuesCountOnPage, pageNumber }) => ({
    fetchIssuesIfNeeded: () =>
      dispatch(fetchIssuesIfNeededActionCreator({ userName, repoName, issuesCountOnPage, pageNumber })),
    invalidateIssues: () => dispatch(invalidateIssuesAction()),
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
    shouldShowPaging: Number.isInteger(issuesPagesCount) && issuesPagesCount > 1 && issues.length > 0,
  };
});

export default compose(
  withReducer,
  withRouteParams,
  withValidIssuesCountOnPage,
  withConnect,
  withIssuesListProps,
  withHandlers({
    makeIssueUrlByNumber: ({ userName, repoName, issuesCountOnPage }) => number =>
      makeIssueUrl(userName, repoName, number, issuesCountOnPage),
    makePageUrlByNumber: ({ userName, repoName, issuesCountOnPage }) => pageNumber =>
      makeIssuesListUrl(userName, repoName, issuesCountOnPage, pageNumber),
  }),
  withHandlers({
    onIssueTitleClick: ({ history, makeIssueUrlByNumber }) => number => {
      history.push(makeIssueUrlByNumber(number));
    },
    goToNewPage: ({ history, invalidateIssues, makePageUrlByNumber }) => pageNumber => {
      const url = makePageUrlByNumber(pageNumber);
      history.push(url);
      invalidateIssues();
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        this.props.invalidateIssues();
      }
    },
  }),
)(IssuesListContainer);

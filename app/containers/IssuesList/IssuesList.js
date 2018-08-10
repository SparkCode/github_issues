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
import withDefaultValuesContext from 'containers/GithubIssuesPage/withDefaultValuesContext';
import withValidIssuesCountOnPage from 'containers/GithubIssuesPage/withValidIssuesCountOnPage';
import { makeIssuesListUrl, makeIssueUrl } from 'containers/GithubIssuesPage/navigation';
import StatusIssuesBar from './StatusIssuesBar';
import './IssuesList.scss';
import { selectIssuesData, selectIssuesPagesCount } from './selectors';
import { loadIssuesListData as loadIssuesListDataActionCreator } from './actions';
import reducer from './reducer';

class IssuesListContainer extends PureComponent {
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

IssuesListContainer.propTypes = {
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
    loadIssuesListData: () =>
      dispatch(loadIssuesListDataActionCreator({ userName, repoName, issuesCountOnPage, pageNumber })),
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

const withInternalIssueUrl = withProps(({ issues, makeIssueUrlByNumber }) => ({
  issues: issues.map(({ number, ...props }) => ({ number, internalUrl: makeIssueUrlByNumber(number), ...props })),
}));

export default compose(
  withReducer,
  withRouteParams,
  withDefaultValuesContext,
  withValidIssuesCountOnPage,
  withConnect,
  withIssuesListProps,
  withHandlers({
    makeIssueUrlByNumber: ({ userName, repoName, issuesCountOnPage }) => number =>
      makeIssueUrl(userName, repoName, number, issuesCountOnPage),
    makePageUrlByNumber: ({ userName, repoName, issuesCountOnPage }) => pageNumber =>
      makeIssuesListUrl(userName, repoName, issuesCountOnPage, pageNumber),
  }),
  withInternalIssueUrl,
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
    componentDidMount() {
      this.props.loadIssuesListData();
    },
    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        this.props.loadIssuesListData();
      }
    },
  }),
)(IssuesListContainer);

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';
import { compose } from 'redux';
import withRouteParams from 'containers/App/withRouteParams';
import injectReducer from 'utils/injectReducer';
import IssuesList from 'components/IssuesList';
import StatusIssuesBar from './StatusIssuesBar';
import './IssuesList.scss';
import { selectIssuesData, selectIssuesPagesCount } from './selectors';
import { fetchIssuesIfNeeded as fetchIssuesIfNeededActionCreator, goToIssue } from './actions';
import reducer from './reducer';
import Paging from './Paging';
import { withValidIssuesCountOnPage } from '../IssuesSearch/IssuesSearch';

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
    const {
      issuesCountOnPage,
      pageNumber,
      shouldShowPaging,
      repoName,
      userName,
      issues,
      onIssueTitleClick,
    } = this.props;
    const b = block('issues-list-page');
    return (
      <div className={b()}>
        <StatusIssuesBar className={b('status')()} />
        <IssuesList repoName={repoName} userName={userName} issues={issues} onIssueTitleClick={onIssueTitleClick} />
        {shouldShowPaging && (
          <Paging
            repoName={repoName}
            userName={userName}
            currentPage={pageNumber}
            issuesCountOnPage={issuesCountOnPage}
          />
        )}
      </div>
    );
  }
}

// todo: seems issuesCountOnPage need to be validated
IssuesListPage.propTypes = {
  fetchIssuesIfNeeded: PropTypes.func.isRequired,
  shouldShowPaging: PropTypes.bool.isRequired,
  issuesCountOnPage: PropTypes.string.isRequired,
  issues: PropTypes.array.isRequired,
  onIssueTitleClick: PropTypes.func.isRequired,
  repoName: PropTypes.string,
  userName: PropTypes.string,
  pageNumber: PropTypes.number,
};

const withReducer = injectReducer({ key: 'issuesListPage', reducer });

const withConnect = connect(
  state => ({
    issuesPagesCount: selectIssuesPagesCount(state),
    issues: selectIssuesData(state),
  }),
  (dispatch, { userName, repoName, issuesCountOnPage, pageNumber }) => ({
    fetchIssuesIfNeeded: () =>
      dispatch(fetchIssuesIfNeededActionCreator({ userName, repoName, issuesCountOnPage, pageNumber })),
    onIssueTitleClick: number => dispatch(goToIssue({ number, userName, repoName, issuesCountOnPage })),
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
  withValidIssuesCountOnPage,
  withConnect,
  withIssuesListProps,
)(IssuesListPage);

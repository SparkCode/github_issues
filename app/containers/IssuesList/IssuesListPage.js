import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import block from 'bem-cn';
import * as queryString from 'query-string';
import PropTypes from 'prop-types';
import { fetchIssuesIfNeeded as fetchIssuesIfNeededActionCreator } from 'actionCreators';
import IssuesList from './IssuesList';
import Paging from './Paging';
import { selectIssuesData, selectIssuesPagesCount } from 'selectors';
import { withProps } from 'recompose';
import { compose } from 'redux';

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
        <IssuesList repoName={repoName} userName={userName} />
        {shouldShowPaging && (
          <Paging repoName={repoName} userName={userName} currentPage={pageNumber} issuesCount={issuesCount} />
        )}
      </div>
    );
  }
}

IssuesListPage.propTypes = {
  shouldShowPaging: PropTypes.bool.isRequired,
  issuesCount: PropTypes.string.isRequired,
  repoName: PropTypes.string,
  userName: PropTypes.string,
  pageNumber: PropTypes.number,
};

const withConnect = connect(state => ({
  issuesPagesCount: selectIssuesPagesCount(state),
  issues: selectIssuesData(state),
}));

const withIssuesListProps = withProps(({ issuesPagesCount, issues, location: { search } }) => {
  const { pageNumber } = queryString.parse(search);
  const parsedPageNumber = Number.parseInt(pageNumber);
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

const withDispatchingFetchIssuesIfNeededActionCreator = connect(
  null,
  (dispatch, { userName, repoName, issuesCount, pageNumber }) => ({
    fetchIssuesIfNeeded: () =>
      dispatch(fetchIssuesIfNeededActionCreator({ userName, repoName, issuesCount, pageNumber })),
  }),
);

export default compose(
  withConnect,
  withIssuesListProps,
  withDispatchingFetchIssuesIfNeededActionCreator,
)(IssuesListPage);

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import block from 'bem-cn';
import * as queryString from 'query-string';
import PropTypes from 'prop-types';
import { withProps } from 'recompose';
import { fetchIssuesIfNeeded as fetchIssuesIfNeededActionCreator } from 'actionCreators';
import { selectIssuesData, selectIssuesPagesCount } from 'selectors/index';
import { compose } from 'redux';
import IssuesList from './IssuesList';
import Paging from './Paging';

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
  fetchIssuesIfNeeded: PropTypes.func.isRequired,
  shouldShowPaging: PropTypes.bool.isRequired,
  issuesCount: PropTypes.string.isRequired,
  repoName: PropTypes.string,
  userName: PropTypes.string,
  pageNumber: PropTypes.number,
};

const withQueryStringParams = withProps(({ location: { search } }) => ({ ...queryString.parse(search) }));

const withConnect = connect(
  state => ({
    issuesPagesCount: selectIssuesPagesCount(state),
    issues: selectIssuesData(state),
  }),
  (dispatch, { userName, repoName, issuesCount, pageNumber }) => ({
    fetchIssuesIfNeeded: () =>
      dispatch(fetchIssuesIfNeededActionCreator({ userName, repoName, issuesCount, pageNumber })),
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
  withQueryStringParams,
  withConnect,
  withIssuesListProps,
)(IssuesListPage);

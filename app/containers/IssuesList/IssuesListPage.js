import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import block from 'bem-cn';
import * as queryString from 'query-string';
import PropTypes from 'prop-types';
import { fetchIssuesIfNeeded } from '../../actionCreators';
import IssuesList from './IssuesList';
import Paging from './Paging';
import { selectIssuesData, selectPaging } from 'selectors';

class IssuesListPage extends PureComponent {
  componentDidMount() {
    this.fetchIssuesIfNeeded(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.fetchIssuesIfNeeded(newProps);
  }

  fetchIssuesIfNeeded(props) {
    const {
      dispatchFetchIssuesIfNeeded,
      issuesCount,
      pageNumber,
      repoName,
      userName,
    } = props;
    dispatchFetchIssuesIfNeeded({
      issuesCount,
      pageNumber,
      repoName,
      userName,
    });
  }

  render() {
    const {
      issuesCount,
      pageNumber,
      shouldShowPaging,
      repoName,
      userName,
    } = this.props;
    const b = block('issues-list-page');
    return (
      <div className={b()}>
        <IssuesList repoName={repoName} userName={userName} />
        {shouldShowPaging && (
          <Paging
            repoName={repoName}
            userName={userName}
            // todo: + here no looks good
            currentPage={+pageNumber}
            issuesCount={issuesCount}
          />
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
  pageNumber: PropTypes.string,
};
IssuesListPage.defaultProps = {};

const mapStateToProps = (immutableState, ownProps) => {
  const {
    issuesCountOptions,
    defaultIssuesCountOption,
    issuesPagesCount,
  } = selectPaging(immutableState);
  const issues = selectIssuesData(immutableState);
  const { userName, repoName } = ownProps.match.params; // todo: не здесь
  const { issuesCount, pageNumber } = queryString.parse(
    ownProps.location.search,
  );
  return {
    shouldShowPaging:
      !isNaN(issuesPagesCount) && issuesPagesCount > 1 && issues.length > 1,
    issuesCount:
      issuesCountOptions.indexOf(issuesCount) !== -1
        ? issuesCount
        : defaultIssuesCountOption,
    pageNumber: isPageNumberValid(pageNumber, issuesPagesCount)
      ? pageNumber
      : '1',
    userName,
    repoName,
  };
};

const isPageNumberValid = (pageNumber, issuesPagesCount) => {
  if (isNaN(pageNumber)) {
    return false;
  }
  return (
    (issuesPagesCount && pageNumber <= issuesPagesCount && pageNumber > 0) || // todo: почему валидно при !issuesPagesCount?
    !issuesPagesCount
  );
};

const mapDispatchToProps = { dispatchFetchIssuesIfNeeded: fetchIssuesIfNeeded };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IssuesListPage);

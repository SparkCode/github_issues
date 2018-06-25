import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import block from 'bem-cn';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import reducer from 'mainReducers';
import './HomePage.css';
import SearchIssues from './SearchIssues';
import StatusIssuesBar from './StatusIssuesBar';
import IssuesListPage from '../IssuesList/IssuesListPage';
import IssueDetailPage from '../IssueDetail/IssueDetailPage';

class HomePage extends PureComponent {
  render() {
    const b = block('home-page');
    const { userName, repoName, issuesCount } = this.props;
    return (
      <div className={b()}>
        <SearchIssues
          className={b('search')()}
          defaultUserName={userName}
          defaultRepoName={repoName}
          defaultIssuesCount={issuesCount}
        />
        <StatusIssuesBar className={b('status')()} />
        <Route
          exact
          path="/:userName/:repoName/issues"
          component={IssuesListPage}
        />
        <Route
          exact
          path="/:userName/:repoName/issues/:issueNumber"
          component={IssueDetailPage}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  userName: PropTypes.string,
  repoName: PropTypes.string,
  issuesCount: PropTypes.string.isRequired,
};
HomePage.defaultProps = {};

const mapStateToProps = (immutableState, ownProps) => {
  const state = immutableState.toJS();
  const { userName, repoName } = ownProps.match.params;
  const { issuesCount } = queryString.parse(ownProps.location.search);
  const {
    issuesCountOptions,
    defaultIssuesCountOption,
  } = state.home.issues.paging;
  return {
    userName,
    repoName,
    issuesCount:
      issuesCountOptions.indexOf(issuesCount) !== -1
        ? issuesCount
        : defaultIssuesCountOption,
  };
};

const withReducer = injectReducer({ key: 'home', reducer });
const withConnect = connect(mapStateToProps);

export default compose(
  withReducer,
  withConnect,
)(HomePage);

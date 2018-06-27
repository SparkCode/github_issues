import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectReducer from 'utils/injectReducer';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import reducer from 'mainReducers';
import './HomePage.css';
import SearchIssues from './SearchIssues';
import StatusIssuesBar from './StatusIssuesBar';
import IssuesListPage from 'containers/IssuesList';
import IssueDetailPage from 'containers/IssueDetail';
import { mapProps, compose } from 'recompose';
import { selectDefaultIssuesCountOption, selectIssuesCountOptions } from 'selectors';

class HomePage extends PureComponent {
  render() {
    const b = block('home-page');
    const { issuesCount, userName, repoName } = this.props;
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
          render={props => (
            <IssuesListPage {...props} issuesCount={issuesCount} userName={userName} repoName={repoName} />
          )}
        />
        <Route
          exact
          path="/:userName/:repoName/issues/:issueNumber"
          render={props => <IssueDetailPage {...props} userName={userName} repoName={repoName} />}
        />
      </div>
    );
  }
}

// todo: rewrite it for HomePage namespace
HomePage.propTypes = {
  userName: PropTypes.string,
  repoName: PropTypes.string,
  issuesCount: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  issuesCountOptions: selectIssuesCountOptions(state),
  defaultIssuesCountOption: selectDefaultIssuesCountOption(state),
});

const withReducer = injectReducer({ key: 'home', reducer });

const withConnect = connect(mapStateToProps);

const withRouteParams = mapProps(({ match: { params: { userName, repoName } }, location: { search }, ...props }) => ({
  userName,
  repoName,
  ...queryString.parse(search),
  ...props,
}));

const withValidIssuesCount = mapProps(({ issuesCountOptions, issuesCount, defaultIssuesCountOption, ...props }) => ({
  issuesCount: issuesCountOptions.indexOf(issuesCount) !== -1 ? issuesCount : defaultIssuesCountOption,
  ...props,
}));

export default compose(
  withReducer,
  withRouteParams,
  withConnect,
  withValidIssuesCount,
)(HomePage);

import IssuesSearch from 'components/IssuesSearch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, mapProps, defaultProps, withHandlers } from 'recompose';
import injectReducer from 'utils/injectReducer';
import withRouteParams from 'containers/App/withRouteParams';
import { invalidateIssues as invalidateIssuesAction } from 'containers/IssuesList/actions';
import { makeIssuesListUrl } from 'containers/GithubIssuesPage/navigation';
import { loadUserRepositories } from './actions';
import {
  selectUserRepositories,
  selectIssuesCountOnPageOptions,
  selectDefaultIssuesCountOnPageOption,
} from './selectors';
import reducer from './reducer';

const mapStateToProps = state => ({
  issuesCountOnPageOptions: selectIssuesCountOnPageOptions(state),
  userRepositories: selectUserRepositories(state),
});

const mapDispatchToProps = dispatch => ({
  invalidateIssues: () => dispatch(invalidateIssuesAction()),
  searchReposByUserName: bindActionCreators(loadUserRepositories, dispatch),
});

export const withValidIssuesCountOnPage = compose(
  connect(state => ({
    issuesCountOnPageOptions: selectIssuesCountOnPageOptions(state),
    defaultIssuesCountOnPageOption: selectDefaultIssuesCountOnPageOption(state),
  })),
  mapProps(({ issuesCountOnPageOptions, issuesCountOnPage, defaultIssuesCountOnPageOption, ...props }) => ({
    issuesCountOnPage:
      issuesCountOnPageOptions.indexOf(issuesCountOnPage) !== -1 ? issuesCountOnPage : defaultIssuesCountOnPageOption,
    ...props,
  })),
);

const withReducer = injectReducer({ key: 'issuesSearch', reducer });

export default compose(
  defaultProps({
    onSearch: () => {},
    className: 'issues-search__search',
  }),
  withRouteParams,
  withReducer,
  withValidIssuesCountOnPage,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withHandlers({
    onSearch: ({ history, invalidateIssues }) => (userName, repoName, issuesCountOnPage) => {
      const url = makeIssuesListUrl(userName, repoName, issuesCountOnPage, 1);
      history.push(url);
      invalidateIssues();
    },
  }),
  mapProps(({ issuesCountOnPage, userName, repoName, ...props }) => ({
    ...props,
    defaultIssuesCountOnPage: issuesCountOnPage,
    defaultUserName: userName,
    defaultRepoName: repoName,
  })),
)(IssuesSearch);

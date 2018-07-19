import IssuesSearch from 'components/IssuesSearch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, mapProps, defaultProps, withHandlers } from 'recompose';
import injectReducer from 'utils/injectReducer';
import withRouteParams from 'containers/App/withRouteParams';
import { withDefaultValuesContext, withValidIssuesCountOnPage, makeIssuesListUrl } from 'containers/GithubIssuesPage';
import { loadUserRepositories } from './actions';
import { selectUserRepositories } from './selectors';
import reducer from './reducer';

const mapStateToProps = state => ({
  userRepositories: selectUserRepositories(state),
});

const mapDispatchToProps = dispatch => ({
  searchReposByUserName: bindActionCreators(loadUserRepositories, dispatch),
});

const withReducer = injectReducer({ key: 'issuesSearch', reducer });

export default compose(
  defaultProps({
    onSearch: () => {},
    className: 'issues-search__search',
  }),
  withRouteParams,
  withReducer,
  withDefaultValuesContext,
  withValidIssuesCountOnPage,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withHandlers({
    onSearch: ({ history }) => (userName, repoName, issuesCountOnPage) => {
      const url = makeIssuesListUrl(userName, repoName, issuesCountOnPage, 1);
      history.push(url);
    },
  }),
  mapProps(({ issuesCountOnPage, userName, repoName, ...props }) => ({
    ...props,
    defaultIssuesCountOnPage: issuesCountOnPage,
    defaultUserName: userName,
    defaultRepoName: repoName,
  })),
)(IssuesSearch);

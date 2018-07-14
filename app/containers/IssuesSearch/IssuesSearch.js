import IssuesSearch from 'components/IssuesSearch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, mapProps, defaultProps } from 'recompose';
import injectReducer from 'utils/injectReducer';
import withRouteParams from 'containers/App/withRouteParams';
import { IssuesSearch as IssuesSearchAction, loadUserRepositories } from './actions';
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
  onSearch: (userName, repoName, issuesCountOnPage) => {
    dispatch(
      IssuesSearchAction({
        userName,
        repoName,
        issuesCountOnPage,
        pageNumber: 1,
      }),
    );
  },
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
  mapProps(({ issuesCountOnPage, userName, repoName, ...props }) => ({
    ...props,
    defaultIssuesCountOnPage: issuesCountOnPage,
    defaultUserName: userName,
    defaultRepoName: repoName,
  })),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(IssuesSearch);

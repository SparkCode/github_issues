import IssuesSearch from 'components/IssuesSearch';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, mapProps, defaultProps } from 'recompose';
import injectReducer from 'utils/injectReducer';
import { IssuesSearch as IssuesSearchAction, loadUserRepositories } from './actions';
import { selectUserRepositories, selectIssuesCountOptions, selectDefaultIssuesCountOption } from './selectors';
import reducer from './reducer';

const mapStateToProps = state => ({
  issuesCountOptions: selectIssuesCountOptions(state),
  userRepositories: selectUserRepositories(state),
});

const mapDispatchToProps = (dispatch, { onSearch }) => ({
  onSearch: (userName, repoName, issuesCount) => {
    dispatch(
      IssuesSearchAction({
        userName,
        repoName,
        issuesCount,
        pageNumber: 1,
      }),
    );
    onSearch();
  },
  searchReposByUserName: bindActionCreators(loadUserRepositories, dispatch),
});

export const withValidIssuesCount = compose(
  connect(state => ({
    issuesCountOptions: selectIssuesCountOptions(state),
    defaultIssuesCountOption: selectDefaultIssuesCountOption(state),
  })),
  mapProps(({ issuesCountOptions, defaultIssuesCount, defaultIssuesCountOption, ...props }) => ({
    issuesCount: issuesCountOptions.indexOf(defaultIssuesCount) !== -1 ? defaultIssuesCount : defaultIssuesCountOption,
    ...props,
  })),
);

const withReducer = injectReducer({ key: 'issuesSearch', reducer });

export default compose(
  defaultProps({
    onSearch: () => {},
  }),
  withReducer,
  withValidIssuesCount,
  mapProps(({ issuesCount, ...props }) => ({ ...props, defaultIssuesCount: issuesCount })),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(IssuesSearch);

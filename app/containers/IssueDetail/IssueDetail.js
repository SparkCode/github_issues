import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose, withProps } from 'recompose';
import withRouteParams from 'containers/App/withRouteParams';
import injectReducer from 'utils/injectReducer';
import IssueDetail from 'components/IssueDetail';
import reducer from './reducer';
import StatusIssuesBar from './StatusIssuesBar';
import { selectIsIssueSuccessfullyBeLoaded, selectIssue } from './selectors';
import './IssueDetail.scss';
import { fetchIssueIfNeeded as fetchIssueIfNeededAction } from './actions';

class IssueDetailContainer extends PureComponent {
  componentDidMount() {
    const { fetchIssueIfNeeded } = this.props;
    fetchIssueIfNeeded();
  }

  render() {
    const { issueBeLoaded, issue = {}, repoName, userName } = this.props;
    const b = block('issue-detail-page');
    return [
      issueBeLoaded && (
        <Helmet key="header">
          <meta
            name="Description"
            content={`The description of the "${issue.title}" issue created by ${
              issue.userLogin
            } in the ${repoName} Github repository. The repository is owned by ${userName}`}
          />
        </Helmet>
      ),
      <div className={b()} key="body">
        <StatusIssuesBar className={b('status')()} />
        {issueBeLoaded && <IssueDetail {...issue} />}
      </div>,
    ];
  }
}

const withReducer = injectReducer({ key: 'issueDetail', reducer });

IssueDetailContainer.propTypes = {
  fetchIssueIfNeeded: PropTypes.func.isRequired,
  issueBeLoaded: PropTypes.bool.isRequired,
  issue: PropTypes.object,
  repoName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { issueNumber }) => ({
  issueBeLoaded: selectIsIssueSuccessfullyBeLoaded(state),
  issue: selectIssue(state, issueNumber),
});

const mapDispatchToProps = (dispatch, { userName, repoName, issueNumber }) => ({
  fetchIssueIfNeeded: () => dispatch(fetchIssueIfNeededAction({ userName, repoName, issueNumber })),
});

const withIssueNumber = withProps(({ match: { params: { issueNumber } } }) => ({
  issueNumber: Number.parseInt(issueNumber, 10),
}));

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withReducer,
  withRouteParams,
  withIssueNumber,
  withConnect,
)(IssueDetailContainer);

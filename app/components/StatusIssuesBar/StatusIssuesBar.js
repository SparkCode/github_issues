import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import './StatusIssuesBar.css';
import classnames from 'classnames';

class StatusIssuesBar extends PureComponent {
  render() {
    const {
      issuesBeReceived,
      issuesIsLoading,
      isRequestFailed,
      errorMessage,
      noIssueHave,
      className,
      noIssuesBeReceivedMessage,
      issuesIsLoadingMessage,
    } = this.props;

    const b = block('status-issues-bar');

    // todo: looks ugly
    const status = isRequestFailed
      ? errorMessage
      : issuesBeReceived && noIssueHave
        ? noIssuesBeReceivedMessage
        : issuesIsLoading
          ? issuesIsLoadingMessage
          : null;
    return <div className={classnames(className, b())}>{status}</div>;
  }
}

StatusIssuesBar.propTypes = {
  issuesBeReceived: PropTypes.bool.isRequired,
  issuesIsLoading: PropTypes.bool.isRequired,
  isRequestFailed: PropTypes.bool.isRequired,
  noIssueHave: PropTypes.bool.isRequired,
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  noIssuesBeReceivedMessage: PropTypes.string,
  issuesIsLoadingMessage: PropTypes.string,
};
StatusIssuesBar.defaultProps = {
  noIssuesBeReceivedMessage: 'No issues be found in this repository',
  issuesIsLoadingMessage: 'Data is loading...',
  errorMessage: 'Something went wrong',
};

export default StatusIssuesBar;

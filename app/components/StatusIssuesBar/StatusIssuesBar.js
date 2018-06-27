import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import './StatusIssuesBar.css';
import classnames from 'classnames';

class StatusIssuesBar extends PureComponent {
  render() {
    const {
      issuesIsLoading,
      isRequestFailed,
      errorMessage,
      className,
      noIssuesBeReceivedMessage,
      issuesIsLoadingMessage,
      noIssuesReceived,
    } = this.props;

    const b = block('status-issues-bar');

    // todo: looks ugly
    const status = isRequestFailed
      ? errorMessage
      : noIssuesReceived
        ? noIssuesBeReceivedMessage
        : issuesIsLoading
          ? issuesIsLoadingMessage
          : null;
    return <div className={classnames(className, b())}>{status}</div>;
  }
}

StatusIssuesBar.propTypes = {
  issuesIsLoading: PropTypes.bool.isRequired,
  isRequestFailed: PropTypes.bool.isRequired,
  noIssuesReceived: PropTypes.bool.isRequired,
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

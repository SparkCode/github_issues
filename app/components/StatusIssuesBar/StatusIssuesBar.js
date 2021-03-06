import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import classnames from 'classnames';
import './StatusIssuesBar.scss';

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

    /* eslint-disable no-nested-ternary  */
    const status = isRequestFailed
      ? errorMessage
      : noIssuesReceived
        ? noIssuesBeReceivedMessage
        : issuesIsLoading
          ? issuesIsLoadingMessage
          : null;
    /* eslint-enable no-nested-ternary  */
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

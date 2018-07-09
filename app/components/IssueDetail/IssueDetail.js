import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import formatDate from 'utils/formatDate';
import Markdown from 'components/Markdown';
import Link from 'components/Link';
import block from 'bem-cn';
import './IssueDetail.scss';

class IssueDetail extends PureComponent {
  render() {
    const b = block('issue-detail');
    const { title, number, state, userLogin, createdAt, body, issueUrl, userUrl, userAvatarUrl } = this.props;
    const date = formatDate(createdAt);
    return (
      <div className={b()}>
        <div className={b('top')()}>
          <div className={b('state', { state })()}>{state}</div>
          <h1 className={b('header')()}>
            <Link href={issueUrl} target="_blank">
              {title}
            </Link>
            <span className={b('number')()}> #{number}</span>
          </h1>
        </div>
        <img className={b('avatar')()} src={userAvatarUrl} alt={`${userLogin}'s avatar`} />
        <div className={b('message')()}>
          <div className={b('message-header')()}>
            <Link href={userUrl} target="_blank" className={b('user-login')()}>
              {userLogin}
            </Link>
            <div className={b('created-at')()}>{`commented on ${date}`}</div>
          </div>
          <Markdown className={b('description')()} text={body} />
        </div>
      </div>
    );
  }
}

IssueDetail.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  state: PropTypes.oneOf(['open', 'close']),
  userLogin: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  issueUrl: PropTypes.string.isRequired,
  userUrl: PropTypes.string.isRequired,
  userAvatarUrl: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
IssueDetail.defaultProps = {};

export default IssueDetail;

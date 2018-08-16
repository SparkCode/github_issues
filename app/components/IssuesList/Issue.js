import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import formatDate from 'utils/formatDate';
import Link from 'components/Link';
import './Issue.scss';

class Issue extends PureComponent {
  onTitleClick = e => {
    e.preventDefault();
    const { number, onTitleClick } = this.props;
    onTitleClick(number);
  };

  render() {
    const { number, title, createdAt, internalUrl } = this.props;
    const b = block('issues-list-element');
    const date = formatDate(createdAt);
    return (
      <li className={b()}>
        <Link onClick={this.onTitleClick} href={internalUrl} className={b('link')()}>
          <span className={b('title')()}>{title}</span>
          <div className={b('body')()}>
            <div className={b('number')()}>{`#${number}`}</div>
            <div className={b('createdAt')()}>{`opened on ${date}`}</div>
          </div>
        </Link>
      </li>
    );
  }
}

Issue.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  internalUrl: PropTypes.string.isRequired,
};
Issue.defaultProps = {};

export default Issue;

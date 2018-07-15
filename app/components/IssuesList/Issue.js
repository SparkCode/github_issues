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
    const { number, title, createdAt, url } = this.props;
    const b = block('issues-list-element');
    const date = formatDate(createdAt);
    return (
      <li className={b()}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link className={b('title')()} onClick={this.onTitleClick} href={url}>
          {title}
        </Link>
        <div className={b('body')()}>
          <div className={b('number')()}>{`#${number}`}</div>
          <div className={b('createdAt')()}>{`opened on ${date}`}</div>
        </div>
      </li>
    );
  }
}

Issue.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
Issue.defaultProps = {};

export default Issue;

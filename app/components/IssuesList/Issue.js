import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { formatDate } from 'utils';
import './Issue.scss';
import Link from '../Link';

class Issue extends PureComponent {
  onTitleClick = () => {
    const { number, onTitleClick } = this.props;
    onTitleClick(number);
  };

  render() {
    const { number, title, createdAt } = this.props;
    const b = block('issues-list-element');
    const date = formatDate(createdAt);
    return (
      <li className={b()}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link className={b('title')()} onClick={this.onTitleClick}>
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
};
Issue.defaultProps = {};

export default Issue;

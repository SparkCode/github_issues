import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import './Issue.scss';
import { formatDate } from 'utils';
import Link from '../Link';

class Issue extends PureComponent {
  onTitleClick = () => {
    const { id, onTitleClick } = this.props;
    onTitleClick(id);
  };

  render() {
    const { number, title, createdAt } = this.props;
    const b = block('issues-list-element');
    const date = formatDate(createdAt);
    return (
      <li className={b()}>
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
  id: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onTitleClick: PropTypes.func.isRequired,
};
Issue.defaultProps = {};

export default Issue;

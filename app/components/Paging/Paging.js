import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import './Paging.scss';
import PageButton from './PageButton';

// todo: no looks great for mobile users
class Paging extends PureComponent {
  getButtonsProps(pagesNumber, currentPage, start, finish, className, makePageUrlByNumber) {
    const configures = [];

    if (start > 1) {
      configures.push({ name: '1', value: 1, key: '1', href: makePageUrlByNumber(pagesNumber) });
    }

    if (start > 2) {
      configures.push({ name: '...', key: 'unshown-right' });
    }

    for (let i = start; i <= finish; i += 1) {
      configures.push({
        name: i.toString(),
        active: i === currentPage,
        key: i.toString(),
        value: i,
        href: makePageUrlByNumber(i),
      });
    }

    if (finish < pagesNumber) {
      configures.push({ name: '...', key: 'unshown-left' });
      configures.push({
        name: pagesNumber.toString(),
        value: pagesNumber,
        key: pagesNumber.toString(),
        href: makePageUrlByNumber(pagesNumber),
      });
    }

    return configures
      .map(b => ({ ...b, className }))
      .map(b => (b.value === currentPage || !b.value ? { ...b, disabled: true } : b));
  }

  render() {
    const { pagesNumber, currentPage, goToNewPage, maxVisiblePagesFromEachSide = 2, makePageUrlByNumber } = this.props;
    const b = block('paging');
    const startVisiblePage = Math.max(currentPage - maxVisiblePagesFromEachSide, 1);
    const finishVisiblePage = Math.min(currentPage + maxVisiblePagesFromEachSide, pagesNumber);
    const buttonsProps = this.getButtonsProps(
      pagesNumber,
      currentPage,
      startVisiblePage,
      finishVisiblePage,
      b('page-link')(),
      makePageUrlByNumber,
    );
    const buttons = buttonsProps.map(c => <PageButton goToNewPage={goToNewPage} {...c} />);
    return <div className={b()}>{buttons}</div>;
  }
}

Paging.propTypes = {
  goToNewPage: PropTypes.func.isRequired,
  pagesNumber: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  makePageUrlByNumber: PropTypes.func.isRequired,
  maxVisiblePagesFromEachSide: PropTypes.number,
};
Paging.defaultProps = {};

export default Paging;

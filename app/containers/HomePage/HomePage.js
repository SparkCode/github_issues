import React, { PureComponent } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import IssuesSearch from 'containers/IssuesSearch';
import './HomePage.scss';

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends PureComponent {
  render() {
    const b = block('home-page');
    const { children } = this.props;
    return (
      <div className={b()}>
        <IssuesSearch className={b('search')()} />
        {children}
      </div>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.element,
};

HomePage.defaultProps = {
  children: null,
};

export default HomePage;

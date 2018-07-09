import React, { PureComponent } from 'react';
import block from 'bem-cn';
import IssuesSearch from 'containers/IssuesSearch';
import './HomePage.scss';

// eslint-disable-next-line react/prefer-stateless-function
class HomePage extends PureComponent {
  render() {
    const b = block('home-page');
    return (
      <div className={b()}>
        <IssuesSearch className={b('search')()} />
      </div>
    );
  }
}

export default HomePage;

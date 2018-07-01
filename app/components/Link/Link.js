import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import classnames from 'classnames';
import './Link.scss';

class Link extends PureComponent {
  render() {
    const { className, children, ...props } = this.props;
    const b = block('link');
    return (
      <a className={classnames(className, b())} {...props}>
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default Link;

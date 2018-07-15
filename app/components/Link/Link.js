import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import classnames from 'classnames';
import './Link.scss';

class Link extends PureComponent {
  render() {
    const { className, children, href, onClick, ...props } = this.props;
    const b = block('link');
    return (
      <a className={classnames(className, b())} href={href} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any,
};

Link.defaultProps = {
  onClick: () => {},
};

export default Link;

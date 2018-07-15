import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import block from 'bem-cn';
import './PageButton.scss';

class PageButton extends PureComponent {
  onClick = e => {
    const { goToNewPage, value } = this.props;
    e.preventDefault();
    goToNewPage(value);
  };

  render() {
    const { className, name, active, disabled, href, goToNewPage, ...props } = this.props;
    const b = block('page-button')({ active });
    return active || disabled ? (
      <span className={classnames(className, b())} {...props}>
        {name}
      </span>
    ) : (
      <a className={classnames(className, b())} onClick={this.onClick} href={href} {...props}>
        {name}
      </a>
    );
  }
}

PageButton.propTypes = {
  goToNewPage: PropTypes.func.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  value(props, propName, componentName) {
    if (props.disabled || props[propName]) {
      return;
    }
    throw new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);
  },
};
PageButton.defaultProps = {
  active: false,
};

export default PageButton;

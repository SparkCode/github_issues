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
    const { className, name, active, disabled, goToNewPage, ...props } = this.props;
    const b = block('page-button')({ active });
    return active || disabled ? (
      <span className={classnames(className, b())} {...props}>
        {name}
      </span>
    ) : (
      // TODO: fix it later:
      /* eslint-disable jsx-a11y/click-events-have-key-events, import/extensions, jsx-a11y/no-static-element-interactions  */
      <a className={classnames(className, b())} onClick={this.onClick} {...props}>
        {name}
      </a>
      /* eslint-enable jsx-a11y/click-events-have-key-events, import/extensions, jsx-a11y/no-static-element-interactions  */
    );
  }
}

PageButton.propTypes = {
  goToNewPage: PropTypes.func.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
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

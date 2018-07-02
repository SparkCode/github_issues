import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import block from 'bem-cn';
import './PageButton.scss';

class PageButton extends PureComponent {
  onClick = () => {
    const { goToNewPage, value } = this.props;
    goToNewPage(value);
  };

  render() {
    const { className, name, active, goToNewPage, ...props } = this.props;
    const b = block('page-button')({ active });
    return (
      <button className={classnames(className, b())} onClick={this.onClick} {...props}>
        {name}
      </button>
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

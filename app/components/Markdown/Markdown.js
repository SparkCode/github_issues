import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import classnames from 'classnames';
import 'github-markdown-css';

class Markdown extends PureComponent {
  render() {
    const { text, className } = this.props;
    const b = block('markdown-body');
    return (
      <div
        className={classnames(className, b())}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }
}

Markdown.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
Markdown.defaultProps = {};

export default Markdown;

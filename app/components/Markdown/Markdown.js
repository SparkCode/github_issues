import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import classnames from 'classnames';
import 'github-markdown-css/github-markdown.css';
import marked from 'marked';

// todo: add a markdown-body class to the container of your rendered Markdown and set a width for it. GitHub uses 980px width and 45px padding, and 15px padding for mobile
class Markdown extends PureComponent {
  render() {
    const { text, className } = this.props;
    const b = block('markdown-body');
    return <div className={classnames(className, b())} dangerouslySetInnerHTML={{ __html: marked(text) }} />;
  }
}

Markdown.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
Markdown.defaultProps = {};

export default Markdown;

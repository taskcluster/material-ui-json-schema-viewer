import React from 'react';
import { string, bool } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import parser from 'markdown-it';
import highlighter from 'markdown-it-highlightjs';

const useStyles = makeStyles(theme => ({
  markdown: {
    '& code': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.text.disabled,
      padding: theme.spacing(0.5),
    },
  },
  inverse: {
    '& code': {
      color: theme.palette.common.black,
      backgroundColor: theme.palette.common.white,
      padding: theme.spacing(0.25),
    },
  },
}));

function Markdown({ children, inverse }) {
  /**
   * Generate classes to define overall style for the schema table.
   */
  const classes = useStyles();
  /**
   *
   */
  const markdown = parser({ linkify: true });

  markdown.use(highlighter);

  return (
    <span
      className={classNames(
        { [`${classes.markdown}`]: !inverse },
        { [`${classes.inverse}`]: inverse }
      )}
      dangerouslySetInnerHTML={{
        __html: markdown.renderInline(children),
      }}
    />
  );
}

Markdown.propTypes = {
  children: string,
  inverse: bool,
};

Markdown.defaultProps = {
  children: '',
  inverse: false,
};

export default React.memo(Markdown);

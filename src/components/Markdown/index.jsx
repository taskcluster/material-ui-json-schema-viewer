import React from 'react';
import { string } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
}));

function Markdown({ children }) {
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
    <span className={classes.markdown}
      dangerouslySetInnerHTML={{
        __html: markdown.renderInline(children)
      }}
    />
  );
}

Markdown.propTypes = {
  children: string,
}

Markdown.defaultProps = {
  children: '',
}

export default React.memo(Markdown);

import React, { Fragment } from 'react';
import { array } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'block',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },

  left: {
    float: 'left',
    width: '50%',
    boxSizing: 'border-box',
    paddingLeft: theme.spacing(1),
    borderTop: `${theme.spacing(0.25)}px solid ${theme.palette.divider}`,
    overflowX: 'auto',
  },
  right: {
    float: 'left',
    width: '50%',
    boxSizing: 'border-box',
    borderTop: `${theme.spacing(0.25)}px solid ${theme.palette.divider}`,
    overflowX: 'auto',
  },
  break: {
    clear: 'both',
  },
}));

function TableLayout({ rows }) {
  const classes = useStyles();

  /* the approach here is to alternate divs for the left and right, with the
   * CSS configuring them so they fit side-by-side with a clear=all after each
   * right-side diff */

  return (
    <div className={classes.wrapper}>
      {rows.map(({ leftRow, rightRow }, i) => {
        return (
          <Fragment key={`row-${i}`}>
            <div className={classes.left}>{leftRow}</div>
            <div className={classes.right}>{rightRow}</div>
            <div className={classes.break} />
          </Fragment>
        );
      })}
    </div>
  );
}

TableLayout.propTypes = {
  /**
   * Array of elements containing {leftRow, rightRow}
   */
  rows: array.isRequired,
};

export default React.memo(TableLayout);

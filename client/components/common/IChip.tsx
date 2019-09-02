import React, { useState } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      float: 'left',
      marginRight: 5,
      marginBottom: theme.spacing(1),
      padding: 3,
      width: 50,
      borderRadius: 10,
      textAlign: 'center',
      opacity: 0.3,
      borderWidth: 1,
      boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
      cursor: 'pointer',
    },
  })
);

const IChip = (props: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { color, onClick, className, label } = props;

  /** @type {{search: React.CSSProperties}} */
  const styles = {
    backgroundColor: color ? color.hex : '#e0e0e0',
    color: color ? 'white' : 'black',
    borderColor: '#e0e0e0',
  }

  function handleOnClick () {
    if (typeof onClick === 'function') {
      onClick();
    }
  }

  return (
    <div className={clsx(classes.root, className)} onClick={handleOnClick} style={styles}>
      <span>{label}</span>
    </div>
  );
};

export default IChip;

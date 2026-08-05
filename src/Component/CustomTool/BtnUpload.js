import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const BtnUpload = ({ label, width }) => {
  const classes = useStyles();
  const useWidthStyle = { width: width + 'px' }
  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          style={width > 0 ? useWidthStyle : {}}
        >
          {label}
        </Button>
      </label>
    </div>
  );
}
export default BtnUpload
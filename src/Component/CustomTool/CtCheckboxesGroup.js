import React from 'react';
import { makeStyles } from '@mui/styles';
import {FormLabel,FormControl,FormGroup, FormControlLabel,FormHelperText,Checkbox} from '@mui/material';

import createSpacing from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        /*  margin: theme.spacing(0),*/ 
    },
}));

export default function CheckboxesGroup({
    minSelectionCount, checkItems, minSelectionErrorMsg, required, label, id, handleOnChange,
    checkedColorCode, minWidth
}) {
    // class CheckboxesGroup extends React.Component {
    const classes = useStyles();
    // render() {

    const error = minSelectionCount && Number(minSelectionCount) > 0 ?
        checkItems.filter((v) => v.checked).length < minSelectionCount : false;
    const errorMsg = error === false ? (minSelectionErrorMsg.length > 0 ? ' ' : '') : minSelectionErrorMsg
    const minWidthStyle = minWidth && minWidth.length > 0 ? { minWidth: minWidth } : {}

    return (
        <div className={classes.root}>
            {/* <div style={{ display: 'flex' }}> */}
            <FormControl
                required={required}
                error={error}
                component="fieldset"
                className={classes.formControl}
                style={ minWidthStyle }
            >
                {/* <FormControl required={required} error={error} component="fieldset"> */}
                <FormLabel component="legend">{label}</FormLabel>
                <FormGroup>
                    {
                        checkItems.map(item => {
                            return (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={item.checked}
                                            onChange={handleOnChange}
                                            name={item.text}
                                            id={id}
                                            // style={item.checked && checkedColorCode ? { color: checkedColorCode } : {}}
                                            style={item.checked ? { color: '#4caf50' } : {}}
                                        />
                                    }
                                    label={item.text}
                                />
                            )
                        })
                    }
                </FormGroup>
                <FormHelperText>{errorMsg}</FormHelperText>
            </FormControl>
        </div>
    );
    // }
}
// export default CheckboxesGroup
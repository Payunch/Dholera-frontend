import React, { Component } from 'react'
import {InputLabel, MenuItem, FormControl, Select } from '@mui/material';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import { makeStyles } from '@mui/styles';

const forColor = 'white'

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    inputLabel: {
        color: forColor,
        "&$inputFocused": {
            color: forColor
        }
    },
    inputFocused: {},
    select: {
        color: forColor,
        "&:before": {
            // changes the bottom textbox border when not focused
            borderColor: '#0000006b' //forColor
        },
        "&:after": {
            // changes the bottom textbox border when clicked/focused.  thought it would be the same with input label
            borderColor: forColor
        }
    }
}));

/* const useStyles = {
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    inputLabel: {
        color: "lightgray",
        "&$inputFocused": {
            color: forColor
        }
    },
    inputFocused: {},
    select: {
        color: "black",
        "&:before": {
            // changes the bottom textbox border when not focused
            borderColor: "red"
        },
        "&:after": {
            // changes the bottom textbox border when clicked/focused.  thought it would be the same with input label
            borderColor: "green"
        }
    }
}; */

class CtCmb extends Component {
    render() {
        const {
            id, label, items, value, width, handleOnChange, disabled, readOnly,
            onKeyDown, defaultAction, validateInput,
            classes
        } = this.props
        // const classes = useStyles();
        const disabledStyle = { disabled: true }
        const itemList = items.map(item => {
            return (
                <MenuItem value={item.name} disabled={item.disabled} key={item.name}>{item.name}</MenuItem>
            )
        })

        const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 1, defaultAction, validateInput) }) : (null)

        const useWidthStyle = { width: width + 'px' }
        return (
            <FormControl className={classes.formControl}>{/*style={{margin: '10px'}}>*/}
                <InputLabel
                    id="demo-simple-select-label"
                    classes={{ focused: classes.inputFocused }}
                    className={classes.inputLabel}>{label}</InputLabel>
                <Select
                    className={classes.select}
                    labelId={`${id}-label`}
                    id={id}
                    name={id}
                    value={value}
                    // onChange={handleChange}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    style={width > 0 ? useWidthStyle : {}}
                    disabled={disabled}
                    readOnly={readOnly}
                >
                    {itemList}
                </Select>
            </FormControl>
        )
    }
}
export default CtCmb
// export default CtCmb
import React from 'react'
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Autorenew, Undo } from '@mui/icons-material';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     margin: {
//         margin: theme.spacing(1),
//     },
//     withoutLabel: {
//         marginTop: theme.spacing(3),
//     },
//     textField: {
//         width: '25ch',
//     },
// }));

const CtTextFieldReset = ({
    id, label, adornment, value, width, disabled, handleOnChange, handleOnResetClick,
    handleOnUndoClick,
    onKeyDown, defaultAction, validateInput
}) => {

    // const classes = useStyles();
    const useWidthStyle = { width: width + 'px', fontWeight: 'bolder', color: '#000000' }
    // const useBoldFontStyle = { fontWeight: 'bolder' }
    const handleOnKeyDown = (onKeyDown) ? ((event) => { onKeyDown(event, 2, defaultAction, validateInput) }) : (null)

    return (
        <FormControl>
            <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
            <Input
                id={id}
                name={id}
                value={value}
                disabled={disabled}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                startAdornment={
                    <InputAdornment position="start">{adornment}</InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleOnResetClick}
                        >
                            {<Autorenew />}
                        </IconButton>
                        {
                            handleOnUndoClick ? (
                                <IconButton
                                    onClick={handleOnUndoClick}
                                >
                                    {<Undo />}
                                </IconButton>
                            ) : null
                        }
                    </InputAdornment>
                }
                style={width > 0 ? useWidthStyle : {}}
            />
        </FormControl>
    )
}

export default CtTextFieldReset
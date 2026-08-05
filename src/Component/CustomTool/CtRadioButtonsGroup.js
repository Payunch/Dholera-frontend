import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

/*
Paremeters Values
display: 
    'block' for single row/line readio buttons arrangement
    'flex'  for single column radio buttons arrangement
*/
export default function RadioButtonsGroup({
    items, disabled, handleOnChange, id, value, label, display
}) {
    /* const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        console.log('event.target',event.target.name,event.target.value)
        setValue(event.target.value);
    }; */

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup aria-label="gender" name={id} id={id} value={value} onChange={handleOnChange} style={{ display: display ? display : 'block' }}>
                {
                    items.map(item => {
                        let disabledValue = disabled === undefined ? false : (disabled === true ? true : false)
                        return <FormControlLabel
                            value={item.text}
                            control={<Radio style={item.text === value ? { color: '#4caf50' } : {}} />}
                            label={item.text}
                            disabled={disabledValue}
                        />
                    })
                }
            </RadioGroup>
        </FormControl>
    );
}

{/* 
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="other" control={<Radio />} label="Other" />
    <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> 
*/}
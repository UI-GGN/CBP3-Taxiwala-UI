import React, { FC } from 'react';
import { InputLabel, Select, MenuItem, FormControl, SelectChangeEvent} from '@mui/material';

interface IDropdownProps {
    label: string;
    handleChange: (text: string) => void;
}

const Dropdown: FC<IDropdownProps > = ({ 
    label,
    handleChange
}: IDropdownProps): JSX.Element => {
    
  return (
    <>
    <FormControl sx={{ m: 1, minWidth: "100%" }}>
    <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          variant="filled"
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={(e: SelectChangeEvent) => handleChange(e.target.value)}
          label={label}
          fullWidth
          displayEmpty
        >
          <MenuItem value={"9:00"}>9:00</MenuItem>
          <MenuItem value={"9:15"}>9:15</MenuItem>
          <MenuItem value={"9:30"}>9:30</MenuItem>
          <MenuItem value={"9:45"}>9:45</MenuItem>
        </Select>
        </FormControl>
    </>
  );
}

export default Dropdown;
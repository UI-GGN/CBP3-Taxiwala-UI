import TextField from '@mui/material/TextField';
import { FC } from 'react';
import CSS from 'csstype';

interface ITextInputProps {
    placeholder: string;
    type: string;
    styles: CSS.Properties;
}

const TextInput: FC<ITextInputProps > = ({ 
    placeholder,
    type,
    styles
}): JSX.Element => {
    
    return <>       
        <TextField
            hiddenLabel
            variant="filled"
            placeholder={placeholder}
            type={type}
            InputProps={{
                sx: {
                    ...styles,
                    borderRadius: "25px",
                    fontSize: "20px",
                    color: "#656565",
                    paddingLeft: "15px"
                },
                disableUnderline: true
              }}
            className="TextInput"
        />
    </>;
}

export default TextInput;
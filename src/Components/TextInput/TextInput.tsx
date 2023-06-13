import TextField from '@mui/material/TextField';
import { FC } from 'react';
import CSS from 'csstype';

interface ITextInputProps {
    placeholder: string;
    type: string;
    styles: CSS.Properties;
    // eslint-disable-next-line no-unused-vars
    handleChange: (text: string) => void;
    disabled?: boolean;
    value: string;
}

const TextInput: FC<ITextInputProps > = ({ 
    placeholder,
    type,
    styles,
    handleChange,
    disabled,
    value
}): JSX.Element => {
    
    return <>       
        <TextField
            hiddenLabel
            variant="filled"
            disabled={disabled || false}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e.target.value)}
            InputProps={{
                sx: {
                    ...styles,
                    // borderRadius: "25px",
                    fontSize: "15px",
                    color: "typography.primary",
                    paddingLeft: "15px"
                },
                // disableUnderline: true
              }}
            className="TextInput"
            fullWidth
        />
    </>;
}

export default TextInput;
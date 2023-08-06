import TextField from "@mui/material/TextField";
import { FC } from "react";
import CSS from "csstype";
import React from "react";
import { InputAdornment } from "@mui/material";

interface ITextInputProps {
	placeholder: string;
	type: string;
	styles: CSS.Properties;
	// eslint-disable-next-line no-unused-vars
	handleChange: (text: string) => void;
	disabled?: boolean;
	value: string;
	id?: number;
	icon?: string;
}

const TextInput: FC<ITextInputProps> = ({
	placeholder,
	type,
	styles,
	handleChange,
	disabled,
	value,
	id,
	icon,
}: ITextInputProps): JSX.Element => {
	return (
		<>
			<TextField
				key={id}
				data-testid="text_input"
				hiddenLabel
				variant="filled"
				disabled={disabled || false}
				placeholder={placeholder}
				type={type}
				value={value}
				onChange={(
					e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
				) => {
					handleChange(e.target.value);
				}}
				InputProps={{
					sx: {
						...styles,
						// borderRadius: "25px",
						fontSize: "15px",
						color: "typography.primary",
						paddingLeft: "15px",
					},
					startAdornment: icon ? (
						<InputAdornment position="start">{icon}</InputAdornment>
					) : null,
					// disableUnderline: true
				}}
				className="TextInput"
				fullWidth
			/>
		</>
	);
};

export default React.memo(TextInput);

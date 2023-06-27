import TextField from "@mui/material/TextField";
import { FC } from "react";
import CSS from "csstype";
import React from "react";

interface ITextInputProps {
	placeholder: string;
	type: string;
	styles: CSS.Properties;
	// eslint-disable-next-line no-unused-vars
	handleChange: (text: string) => void;
	disabled?: boolean;
	value: string;
	id?: number;
	id_changed?: number;
}

const TextInput: FC<ITextInputProps> = ({
	placeholder,
	type,
	styles,
	handleChange,
	disabled,
	value,
	id,
	id_changed,
}: ITextInputProps): JSX.Element => {
	return (
		<>
			<TextField
				key={id}
				data-testid="text_input"
				autoFocus={id === id_changed}
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
					// disableUnderline: true
				}}
				className="TextInput"
				fullWidth
			/>
		</>
	);
};

export default React.memo(TextInput);

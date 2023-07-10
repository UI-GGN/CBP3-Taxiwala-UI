import { FC } from "react";
import {
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	SelectChangeEvent,
} from "@mui/material";

type DropdownValue = {
	value: string;
	label: string;
};

interface IDropdownProps {
	label: string;
	handleChange: (text: string) => void;
	value: string;
	dropdownvalues: DropdownValue[];
	width?: string;
}

const Dropdown: FC<IDropdownProps> = ({
	label,
	handleChange,
	value = "",
	dropdownvalues = [
		{
			value: "9:00",
			label: "9:00",
		},
		{
			value: "10:00",
			label: "10:00",
		},
	],
	width = "100%",
}: IDropdownProps): JSX.Element => {
	return (
		<>
			<FormControl sx={{ mb: 2, minWidth: { width } }}>
				<InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
				<Select
					variant="filled"
					labelId="demo-simple-select-autowidth-label"
					id="demo-simple-select-autowidth"
					onChange={(e: SelectChangeEvent) => handleChange(e.target.value)}
					label={label}
					fullWidth
					value={value}
					displayEmpty
				>
					{dropdownvalues.map((value, label) => (
						<MenuItem key={label} value={value.value}>
							{value.label}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</>
	);
};

export default Dropdown;

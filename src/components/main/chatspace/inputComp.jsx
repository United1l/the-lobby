import { useState } from "react";
import { useUpdate } from "@refinedev/core";
import { Box, Button, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SendIcon from "@mui/icons-material/Send";

const InputComp = props => {
	const userAcc = props.userAcc;
	const { user_name } = userAcc;
	const [input, setInput] = useState({
		mess: "",
		label: 'type something...',
	});
	const { mutate } = useUpdate();

	const handleChange = e => {
		e.preventDefault();

		setInput({
			...input,
			mess: e.target.value,
			label: "",
		});
	}

	const handleSubmit = e => {
		e.preventDefault();
		if (!input.mess.trim()) return;

		let payload = {
			userName: user_name,
			message: input.mess,
			date: "",
		}
	}

	return (
		<Box sx={{height: '8%', width: '100%', display: 'flex', justifyContent: 'space-evenly', 
			alignItems: 'center', position: 'absolute', bottom: '0', border: '1px solid black',
			backgroundColor: 'lightblue'}}>
			<AddBoxIcon color="secondary" sx={{cursor: 'pointer'}} />
			<TextField variant="outlined" type="text" label={input.label} sx={{height: 'l00%', width: '80%',}} 
			value={input.mess} onChange={handleChange} />
			<SendIcon sx={{cursor: 'pointer'}} onClick={handleSubmit} />	
		</Box>
		);
}

export { InputComp }
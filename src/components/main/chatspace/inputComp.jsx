import { useState } from "react";
import { useUpdate } from "@refinedev/core";
import { Box, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SendIcon from "@mui/icons-material/Send";

const InputComp = props => {
	const userAcc = props.userAcc;
	const scroll = props.scroll;
	const clubInfo = props.clubInfo;
	const { id, club_chat } = clubInfo;
	const chats = club_chat;
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

		let today = new Date().toUTCString().slice(0, 22);
		let payload = {
			userName: user_name,
			message: input.mess,
			date: today,
		}

		const jsonPayload = JSON.stringify(payload);

		if (chats) { 
			mutate({
				resource: "GAME_CLUBS",
				values: {
					club_chat: [...chats, jsonPayload],
				},
				id,
			});
		} else if (!chats) {
			mutate({
				resource: "GAME_CLUBS",
				values: {
					club_chat: [jsonPayload],
				},
				id,
			});
		}

		setInput({
			mess: "",
			label: "type something...",
		});

		scroll.current.scrollIntoView(true);
	}

	return (
		<Box sx={{height: '9%', width: '100%', display: 'flex', justifyContent: 'space-evenly', 
			alignItems: 'center', position: 'absolute', bottom: '0', border: '1px solid #adb5db'}}>
			<AddBoxIcon color="secondary" sx={{cursor: 'pointer'}} />
			<TextField variant="outlined" type="text" label={input.label} sx={{height: 'l00%', width: '80%',}} 
			value={input.mess} onChange={handleChange} />
			<SendIcon sx={{cursor: 'pointer'}} onClick={handleSubmit} color="primary" />	
		</Box>
		);
}

export { InputComp }
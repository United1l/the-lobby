import { useState, useEffect } from "react";
import { useUpdate } from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/mui";
import { Paper, Box, TextField, Button, Alert, AlertTitle } from "@mui/material";

const SetUserName = props => {
	const [username, setUserName] = useState("");
	const { mutate } = useUpdate();
	const userId = props.userId;
	const openUserD = props.openUserD;
	const setUserD = props.setUserD;
	let disp = "none";

	const handleChange = e => {
		e.preventDefault();

		setUserName(e.target.value);
	}

	const handleProceed = e => {
		e.preventDefault();
		
		if (userId != 0) {
			mutate({
				resource: "USER_ACCOUNT",
				values: {
					user_name: username,
				},
				id: userId,
			});

			setUserD(false);
		}

		return;
	}

	if (openUserD) disp = "flex";

	return (
		<Paper sx={{height: '60%', width: '45%', display: disp, justifyContent: 'center', alignItems: 'center', 
			position: 'absolute', top: '20%', right: '25%', p: '1rem'}}>
			<Box sx={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
				<ThemedTitleV2
					collapsed={false}
					text="The Lobby"
				/>
				<h3>Set username</h3>
				<TextField type="text" label="Username" value={username} onChange={handleChange}
					variant="outlined" />
				<Alert severity="info">
				<AlertTitle>Info</AlertTitle>
					Ignore this if username is already set <br />
					Refresh page if username dialog is still onscreen
				</Alert>	
				<Button variant="contained" onClick={handleProceed}>Proceed</Button>
			</Box>				
		</Paper>
		);
}

export { SetUserName }
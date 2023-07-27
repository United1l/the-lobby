import { useState } from "react";
import { Box, Button, Divider, List, ListItem, ListItemText } from "@mui/material";

const AccountSettings = props => {
	const bigScreen = props.bigScreen;
	const userAvatar = props.userAvatar;
	const display = props.display;
	const setAccount = props.setAccount;
	const theme = props.theme;
	let w = '100%';
	let right = '';
	let top = '0';

	const handleClose = e => {
		e.preventDefault();

		setAccount(false);
	}

	if (bigScreen) {
		w = '250px';
		right = '5%';
		top = '5.86%';
	}

	return (
		<Box sx={{height: '30%', width: w, position: 'absolute', top: top, right: right, pt: '1rem',
			display: display, flexDirection: 'column', alignItems: 'center', zIndex: '5',
			justifyContent: 'space-evenly', backgroundColor: theme.bg, color: theme.textColor}}>
			{userAvatar}
			<List sx={{width: '80%', bgcolor: 'background.paper'}}>
				<ListItem><Button>Profile Settings</Button></ListItem>
				<Divider />
				<ListItem><Button>Preferences</Button></ListItem>
			</List>
			<Button onClick={handleClose}>close</Button>
		</Box>
		)
}

export { AccountSettings }
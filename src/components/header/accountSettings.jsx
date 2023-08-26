import { useState } from "react";
import { useLogout } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Box, Button, List, ListItem, ListItemText, Paper } from "@mui/material";

const AccountSettings = props => {
	const bigScreen = props.bigScreen;
	const userAvatar = props.userAvatar;
	const setImg = props.setImg;
	const display = props.display;
	const setAccount = props.setAccount;
	const theme = props.theme;
	const { mutate: logout } = useLogout();
	const navigate = useNavigate();
	let w = '100%';
	let right = '';
	let top = '0';
	let mgL = '';

	const handleClose = e => {
		e.preventDefault();

		setAccount(false);
	}

	const handleProfile = e => {
		e.preventDefault();

		navigate('/profile');
	}

	const handlePrefs = e => {
		e.preventDefault();

		navigate('/preferences');
	}

	const handleLogOut = e => {
		e.preventDefault();

		if (localStorage.getItem('userId') || sessionStorage.getItem('userId')) {
			localStorage.removeItem('userId') || sessionStorage.removeItem('userId')
		}

		logout();
	}

	if (bigScreen) {
		w = '250px';
		right = '5%';
		top = '5.86%';
		mgL = '1rem';
	}

	return (
		<Paper sx={{height: '40%', width: w, position: 'absolute', top: top, right: right, pt: '1rem',
			display: display, flexDirection: 'column', alignItems: 'center', zIndex: '5',
			justifyContent: 'space-evenly', backgroundColor: theme.bg, color: theme.textColor}} elevation={4}>
			<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				{userAvatar}
				<input 
					type="file"
					onChange={e => {
						let img = e.target.files[0];
						console.log(img);
						setImg(img.name);
					}}

					accept="image/*"

					style={{marginLeft: mgL}}
				/>	
			</Box>
			<List sx={{width: '80%', bgcolor: theme.bg}}>
				<ListItem><Button onClick={handleProfile}>Profile Settings</Button></ListItem>
				<ListItem><Button onClick={handlePrefs}>Preferences</Button></ListItem>
				<ListItem><Button onClick={handleLogOut}>Log out</Button></ListItem>
			</List>
			<Button onClick={handleClose}>close</Button>
		</Paper>
		)
}

export { AccountSettings }
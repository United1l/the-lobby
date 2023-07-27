import { useState, useEffect, } from "react";
import { useMany, useOne, useUpdate } from "@refinedev/core";
import { Box, Button, Grid } from "@mui/material";
import { useId, useSetId } from "../userAccountContext.jsx";
import { ClubInfo } from "./clubInfo.jsx";
import { GameBoard } from "./gameBoard.jsx";

const Sidebar = props => {
	const bigScreen = props.bigScreen;
	const loggedUser = props.loggedUser;
	const darkMode = props.darkMode;
	const display = props.display;
	const menu = props.menu;
	const setMenu = props.setMenu;
	const [foundUser, setFoundUser] = useState(false);
	const id = useId();
	const setId = useSetId();
	let userAcc = {};
	let layoutDef = {
		defDisp: props.display,
		w: '100%',
	}
	let theme = {
		bg: 'white',
		textColor: 'black',
	};

	let btnText = "Close";

	const handleClose = e => {
		e.preventDefault();

		setMenu(false);
	}

	if (loggedUser) {
		getUser(id);

		if (user_name == loggedUser) {
			userAcc = user;
			setFoundUser(true);	
		} else setId(id + 1);
	}

	if (bigScreen) {
		layoutDef = {
		defDisp: 'flex',
		w: '27%',		
		}

		theme = {...theme, bg: 'gray'}
		btnText = "Logout";
	}

	if (darkMode) {
		theme.bg = 'black';
		theme.textColor = 'white';
	} else {
		theme.bg = 'white';
		theme.textColor = 'black';
	}

	return (
		<Box sx={{position: 'absolute', top: '0', height: '100%', width: layoutDef.w, zIndex: '5', 
			display: layoutDef.defDisp, flexDirection: 'column', alignItems: 'center', backgroundColor: theme.bg, 
			color: theme.textColor, border: '1px solid gray'}}>
			<h5>The Lobby</h5>
			<ClubInfo bigScreen={bigScreen} userAcc={userAcc} />
			<GameBoard bigScreen={bigScreen} foundUser={foundUser} userAcc={userAcc} />
			<Button onClick={handleClose} sx={{cursor: 'pointer'}}>{btnText}</Button>
		</Box>
		);
}

const getUser = id => {
	const { data, isLoading, isError} = useOne({
		resource: "USER_ACCOUNTS",
		id,
	});

	const user = data?.data;

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Something went wrong</div>
	}

	const { user_name } = user;

	return { user_name, user };
}

export { Sidebar }
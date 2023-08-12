import { useState, useEffect, } from "react";
import { useMany, useOne, useUpdate } from "@refinedev/core";
import { Box, Button } from "@mui/material";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";
import { ClubInfo } from "./clubInfo.jsx";
import { GameBoard } from "./gameBoard.jsx";

const Sidebar = props => {
	const bigScreen = props.bigScreen;
	const userAcc = props.userAcc;
	const darkMode = props.darkMode;
	const menu = props.menu;
	const setMenu = props.setMenu;
	const display = props.display;
	const openChat = useOpenChat();
	const setOpenChat = useSetOpenChat();

	let layoutDef = {
		defDisp: display,
		w: '100%',
		h: '70%',
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


	if (bigScreen) {
		layoutDef = {
		defDisp: 'flex',
		w: '20%',
		h: '100%',		
		}

		theme = {...theme, bg: 'gray'}
		btnText = "Logout";
	}


	if (darkMode) {
		theme.bg = 'black';
		theme.textColor = 'white';
	}

	return (
		<Box sx={{position: 'absolute', top: '0', height: layoutDef.h, width: layoutDef.w, zIndex: '5', 
			display: layoutDef.defDisp, flexDirection: 'column', alignItems: 'center', backgroundColor: theme.bg, 
			color: theme.textColor, border: '1px solid gray',}}>
			<h5>The Lobby</h5>
			<ClubInfo bigScreen={bigScreen} userAcc={userAcc} />
			<GameBoard bigScreen={bigScreen} userAcc={userAcc} />
			<Button onClick={handleClose} sx={{cursor: 'pointer'}}>{btnText}</Button>
		</Box>
		);
}

export { Sidebar }
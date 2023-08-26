import { useState, useEffect, } from "react";
import { useMany, useOne, useUpdate } from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/mui";
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
	}
	let theme = {
		bg: '#fff',
	};

	let btnText = "Close";

	const handleClose = e => {
		e.preventDefault();

		setMenu(false);
	}


	if (bigScreen) {
		layoutDef = {
		defDisp: 'flex',
		w: '18%',		
		}

		theme = {...theme, bg: '#fff'}
		btnText = "";
	}


	if (darkMode) {
		theme.bg = '#6c757d';
	}

	return (
		<Box sx={{position: 'absolute', top: '0', height: '100%', width: layoutDef.w, zIndex: '10', 
			display: layoutDef.defDisp, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly',
			 backgroundColor: theme.bg, border: '1px solid #adb5db',}}>
			<ThemedTitleV2
					collapsed={false}
					text="The Lobby"
				/>
			<ClubInfo bigScreen={bigScreen} userAcc={userAcc} theme={theme} />
			<GameBoard bigScreen={bigScreen} userAcc={userAcc} setMenu={setMenu} theme={theme} />
			<Button onClick={handleClose} sx={{cursor: 'pointer'}}>{btnText}</Button>
		</Box>
		);
}

export { Sidebar }
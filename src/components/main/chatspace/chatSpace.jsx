import { useState, useEffect } from "react";
import { Box, Button, Grid } from "@mui/material";
import { MessageBubble } from "./messageComp.jsx";

const ChatSpace = props => {
	const setOpenSett = props.setOpenSett;
	const chatInfo = props.chatInfo;
	const userAcc = props.userAcc;
	const { id, club_chat } = chatInfo;
	const renderChats = [<MessageBubble userName="Ghoul" message="Red hubernets" />];

	const handleClick = e => {
		e.preventDefault();

		setOpenSett(false);
	}

	return (
		<Box className="chatSpace" sx={{height: '80%', width: '100%', display: 'flex', flexDirection: 'column',
			overflowY: 'scroll', overflowX: 'hidden', position: 'relative'}} 
			onClick={handleClick}>
			{renderChats}
		</Box>
		);
}

export { ChatSpace }
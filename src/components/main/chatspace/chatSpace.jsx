import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { MessageBubble } from "./messageComp.jsx";

const ChatSpace = props => {
	const { user_name } = props.userAcc;
	const setOpenSett = props.setOpenSett;
	const clubChat = props.clubChat;
	const setOpenGameD = props.setOpenGameD;
	let renderChats = [];

	const handleClick = e => {
		e.preventDefault();

		setOpenSett(false);
	}
		
	renderChats = clubChat?.map(chat => {
		const parsedChats = JSON.parse(chat);
		const { id, userName, message, date } = parsedChats;

		if (user_name == userName) {
			return <MessageBubble userName={userName} message={message} dateNtime={date} 
				setOpenGameD={setOpenGameD} user key={id} />;			
		}

		return <MessageBubble userName={userName} message={message} dateNtime={date} 
			setOpenGameD={setOpenGameD} key={id} />;
	});

	return (
		<Box className="chatSpace" sx={{height: '80%', width: '100%', display: 'flex', flexDirection: 'column',
			overflowY: 'scroll', overflowX: 'hidden', position: 'relative',}} 
			onClick={handleClick}>
			{renderChats}
		</Box>
		);
}

export { ChatSpace }
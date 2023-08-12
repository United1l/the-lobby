import { useState } from "react";
import { Box } from "@mui/material";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";
import { Recommended } from "./recommended.jsx";
import { Chatroom } from "./chatroom.jsx";

const Main = props => {
	const bigScreen = props.bigScreen;
	const userAcc = props.userAcc;
	const [openRecom, setOpenRecom] = useState(false);
	const openChat = useOpenChat();
	const id = userAcc.id;
	const userClubs = userAcc.game_club;
	const noClubs = userClubs.length == 0;
	let w = '100%';
	let pos = '';

	if (bigScreen) {
		w = '80%';
		pos = 'absolute';
	}

	return (
		<Box sx={{height: '100%', width: w, position: pos, right: '0', display: 'flex', 
			justifyContent: 'center', alignItems: 'center', flexGrow: '1'}}>
			{noClubs && <Recommended id={id} openRecom={openRecom} setOpenRecom={setOpenRecom} />}
			{!openChat.open && <p>Select a club to open chat</p>}
			{openChat.open && <Chatroom userAcc={userAcc} />}
		</Box>
		);
}

export { Main }
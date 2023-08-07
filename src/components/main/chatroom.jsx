import { useState, useEffect } from "react";
import { useMany } from "@refinedev/core";
import { Box, Button, Grid } from "@mui/material";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";
import { GetGroupData } from "../dataRequest.jsx";
import { InputComp } from "./chatspace/inputComp.jsx";
import { ChatSpace } from "./chatspace/chatSpace.jsx";
import { Header } from "./header/header.jsx";
import { ClubSett } from "./header/clubSett.jsx";

const Chatroom = props => {
	const userAcc = props.userAcc;
	let numArr = [];
	for (let i = 0; i < 50; i++) {
		let index = i + 1;
		numArr.push(index);
	}

	const [uids, setUIds] = useState(numArr);
	const [ids, setIds] = useState([1,2,3]);
	const [openSett, setOpenSett] = useState(false);
	const openChat = useOpenChat();
	const clubName = openChat.text;
	let targetClub = null;
	let clubs = [];

	useEffect(() => {
		const fetchClubs = setInterval(() => {
      		const newIds = ids.map(id => id + 3);
      		if (clubs.length > 2) setIds(newIds);
   	 	} ,6000);

		return () => {
      		clearInterval(fetchClubs)
    	}
	}, []);

	const users = GetGroupData("USER_ACCOUNTS", uids);

	clubs = GetGroupData("GAME_CLUBS", ids);

  	if (clubs) { 
		clubs.forEach(club => {
			const { club_name } = club;
			if (club_name == clubName) {
				targetClub = club;
			}
		});
	}

	const { id, club_name, club_members, club_genres, club_admin, club_chat } = targetClub;
	const headerInfo = { id, club_name, club_members, club_genres, club_admin }
	const chatInfo = { id, club_chat }

	return (
		<Box sx={{width: '100%', height: '100%', position: 'relative', display: 'flex', 
			flexDirection: 'column'}}>
			<Header headerInfo={headerInfo} openSett={openSett} setOpenSett={setOpenSett} />
			<ChatSpace chatInfo={chatInfo} userAcc={userAcc} setOpenSett={setOpenSett} />
			<InputComp userAcc={userAcc} />
			{openSett && <ClubSett clubInfo={headerInfo} userAcc={userAcc} setOpenSett={setOpenSett} 
			 users={users} />}
		</Box>
		);
}

export { Chatroom }
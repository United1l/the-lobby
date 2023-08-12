import { useState, useEffect, useRef } from "react";
import { useSubscription } from "@refinedev/core";
import { Box } from "@mui/material";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";
import { GetGroupData } from "../dataRequest.jsx";
import { InputComp } from "./chatspace/inputComp.jsx";
import { ChatSpace } from "./chatspace/chatSpace.jsx";
import { UserGameDialog } from "./chatspace/userGameDialog.jsx";
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
	const [openGameD, setOpenGameD] = useState(false);
	const scroll = useRef();
	const openChat = useOpenChat();
	const clubName = openChat.text;
	let targetClub = null;
	let clubs = [];

	useEffect(() => {
		const fetchClubs = setInterval(() => {
      		const newIds = ids.map(id => id + 3);
      		if (clubs.length > 2) setIds(newIds);
   	 	} ,6000);

   	 	if (scroll.current) {
			scroll.current.scrollIntoView({ behaviour: "smooth" });
		}
		console.log(scroll.current);

		return () => {
      		clearInterval(fetchClubs)
    	}
	}, []);

	useSubscription({
		channel: "resources/GAME_CLUBS",
		types: ["UPDATE"],
	});

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
	const { games } = userAcc;

	return (
		<Box sx={{width: '100%', height: '100%', position: 'relative', display: 'flex', 
			flexDirection: 'column'}}>
			<Header headerInfo={headerInfo} openSett={openSett} setOpenSett={setOpenSett} />
			<ChatSpace setOpenSett={setOpenSett} clubChat={club_chat} setOpenGameD={setOpenGameD} 
				userAcc={userAcc} />
			<span ref={scroll}></span>
			<InputComp userAcc={userAcc} clubInfo={targetClub} scroll={scroll} />
			{openSett && <ClubSett clubInfo={headerInfo} userAcc={userAcc} setOpenSett={setOpenSett} 
			 users={users} setUIds={setUIds} uids={uids} />}
			{<UserGameDialog userGames={games} open={openGameD} setOpenGameD={setOpenGameD} />} 
		</Box>
		);
}

export { Chatroom }
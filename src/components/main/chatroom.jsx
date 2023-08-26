import { useState, useEffect, useRef } from "react";
import { useSubscription, useMany } from "@refinedev/core";
import { Box } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";
import { GetGroupData } from "../dataRequest.jsx";
import { InputComp } from "./chatspace/inputComp.jsx";
import { ChatSpace } from "./chatspace/chatSpace.jsx";
import { UserGameDialog } from "./chatspace/userGameDialog.jsx";
import { Header } from "./header/header.jsx";
import { ClubSett } from "./header/clubSett.jsx";
import cyberpunk from "../../pages/images/chats/cyberpunk.jpg";
import gta from "../../pages/images/chats/gta.jpg";
import cod from "../../pages/images/chats/cod.jpg";
import devil from "../../pages/images/chats/devil.jpg";
import zelda from "../../pages/images/chats/zelda.jpg";
import fifa from "../../pages/images/chats/fifa.jpg";

const Chatroom = props => {
	const userAcc = props.userAcc;
	let numArr = [];
	for (let i = 0; i < 50; i++) {
		let index = i + 1;
		numArr.push(index);
	}
	
	const [uids, setUIds] = useState(numArr);
	const [openSett, setOpenSett] = useState(false);
	const [openGameD, setOpenGameD] = useState(false);
	const scroll = useRef();
	const openChat = useOpenChat();
	const setOpenChat = useSetOpenChat();
	const clubName = openChat.text;
	const clubs = props.clubs;
	let targetClub = null;
	const images = [cyberpunk, gta, zelda, fifa, cod, devil];
	const randomNum = Math.floor(Math.random() * 6);

	useEffect(() => {
   	 	if (scroll.current) {
			scroll.current.scrollIntoView(true);
		}

	}, [scroll.current]);

	useSubscription({
		channel: "resources/GAME_CLUBS",
		types: ["UPDATE"],
	});

	const users = GetGroupData("USER_ACCOUNT", uids);

  	if (clubs) {
  		clubs.forEach(club => {
  			const { club_name } = club;
			if (club_name == clubName) {
				targetClub = club;
			}
		});
  	}

	let headerInfo = null;
	if (targetClub) {
		const { id, club_name, club_members, club_chat, club_admin } =  targetClub;
		headerInfo = { id, club_name, club_members, club_chat, club_admin }
	}

	const { games } = userAcc;

	const handleJoin = e => {
  		e.preventDefault();

  		let newClub = [];
  		let newMem = [];

  		if (userAcc.game_club != null) {
  			newClub = [...userAcc.game_club, headerInfo?.club_name];
  		} else newClub = [headerInfo?.club_name];

  		if (club_members == null) {
  			newMem = [userAcc.user_name];
  		} else newMem = [...headerInfo?.club_members, userAcc.user_name];
  		
  		mutate({
  			resource: "GAME_CLUBS",
  			values: {
  				club_members: newMem,
  			},
  			id,
  		});

  		mutate({
  			resource: "USER_ACCOUNT",
  			values: {
  				game_club: newClub,
  			},
  			id: userAcc.id,
  		});

  		setOpenChat({
  			...openChat,
  			open: false,
  		});
  	}

	const isMember = !headerInfo?.club_members?.includes(userAcc.user_name);

	const join = <Box sx={{height: '8%', width: '100%', display: 'flex', justifyContent: 'center', 
			alignItems: 'center', position: 'absolute', bottom: '0', border: '1px solid #adb5bd',
			backgroundColor: 'lightblue', cursor: 'pointer'}} onClick={handleJoin}>
			<AddBoxIcon color="secondary" />
			<h3>Join club</h3>		
	</Box>;

	return (
		<Box sx={{width: '100%', height: '100%', position: 'relative', display: 'flex', 
			flexDirection: 'column', alignItems: 'center'}}>
			<Header headerInfo={headerInfo} openSett={openSett} setOpenSett={setOpenSett} 
				backgroundImage={images[randomNum]} />
			<ChatSpace setOpenSett={setOpenSett} clubChat={targetClub?.club_chat} setOpenGameD={setOpenGameD} 
				userAcc={userAcc} />
			<span ref={scroll}></span>
			{isMember? join : <InputComp userAcc={userAcc} clubInfo={targetClub} scroll={scroll} />}
			{openSett && <ClubSett clubInfo={headerInfo} userAcc={userAcc} setOpenSett={setOpenSett} 
			 users={users} setUIds={setUIds} uids={uids} backgroundImage={images[randomNum]} />}
			{<UserGameDialog userGames={games} open={openGameD} setOpenGameD={setOpenGameD} />} 
		</Box>
		);
}

export { Chatroom }
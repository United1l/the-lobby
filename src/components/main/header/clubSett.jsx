import { useState, useEffect } from "react";
import { useUpdate, useDelete } from "@refinedev/core";
import { Box, Button, Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useArray, useArrayDispatch } from "../../arrayContext.jsx";
import { useOpenChat, useSetOpenChat } from "../../chatContext.jsx";
import { DeleteOne } from "../../dataRequest.jsx";
import { InfoCont } from "./infoCont.jsx";
import { InfoListCont } from "./infoListCont.jsx";

const ClubSett = props => {
	const clubInfo = props.clubInfo;
	const clubName = clubInfo.club_name;
	const clubMem = clubInfo.club_members;
	const clubGenres = clubInfo.club_genres;
	const clubAdmin = clubInfo.club_admin;
	const clubId = clubInfo.id;
	const users = props.users;
	const userAcc = props.userAcc;
	const { id, user_name } = userAcc;
	const userName = user_name;
	const userId = id;
	const setOpenSett = props.setOpenSett;
	const array = useArray();
	const openChat = useOpenChat();
	const setOpenChat = useSetOpenChat();
	const { mutate } = useUpdate();
	const isAd = userName == clubAdmin;

	const handleLeave = e => {
		e.preventDefault();

		const newGameClub = array.userClubs.filter(club => club != clubName);
		const newClubMem = clubMem.filter(mem => mem != userName);

		mutate({
			resource: "USER_ACCOUNTS",
			values: {
				game_club: newGameClub,
				},
			id: userId,
			});
		

		mutate({
			resource: "GAME_CLUBS",
			values: {
				club_members: newClubMem,
			},
			id: clubId,
		});

		setOpenChat({
			...openChat,
			open: false,
		});		

	}

	const handleDelete = e => {
		e.preventDefault();

		clubMem.forEach(mem => {
			users.forEach(user => {
				const { id, user_name } = user;
				if (user_name == mem) {
					mutate({
						resource: "USER_ACCOUNTS",
						values: {
							game_club: [],
						},
						id,
					});
				}
			});
		});

		DeleteOne("GAME_CLUBS", clubId);

		setOpenChat({
			...openChat,
			open: false,
		});		

	}

	return (
		<Box sx={{height: '77%', width: '60%', position: 'absolute', top: '11%', left: '20%', 
			display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
			alignItems: 'center', borderRadius: '10px', 
			border: '1px solid gray', backgroundColor: "white"}}>
			<Box sx={{height: '20%', width: '100%', backgroundColor: 'gray',}}>
				{/*image-box*/}
			</Box>
			{isAd && <InfoCont title="Club name" isAd={isAd} value={clubName} clubId={clubId} 
				clubMem={clubMem} prevName={clubName} users={users} />}
			{!isAd && <InfoCont title="Club name" value={clubName} />}
			{isAd && <InfoListCont title="Club members" isAd={isAd} value={clubMem} clubId={clubId} 
				users={users} clubName={clubName} clubAdmin={clubAdmin} />}
			{!isAd && <InfoListCont title="Club members" value={clubMem} />}
			<p style={{margin: '0'}}>{`Admin: ${clubAdmin}`}</p>
			{isAd && <InfoListCont title="Club preferences" isAd={isAd} value={clubGenres} 
				clubId={clubId} setOpenSett={setOpenSett} users={users} />}
			{!isAd && <InfoListCont title="Club preferences" value={clubGenres} />}
			<p style={{margin: '0', cursor: 'pointer'}} onClick={handleLeave}>LEAVE CLUB</p>
			{isAd && <p style={{margin: '0', cursor: 'pointer', color: 'red'}} onClick={handleDelete}>
			Delete CLUB</p>}		
		</Box>
		);
}

export { ClubSett }

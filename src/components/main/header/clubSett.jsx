import { useState, useEffect } from "react";
import { useUpdate } from "@refinedev/core";
import { Box, TextField, Paper } from "@mui/material";
import { useArray, useArrayDispatch } from "../../arrayContext.jsx";
import { useOpenChat, useSetOpenChat } from "../../chatContext.jsx";
import { DeleteOne } from "../../dataRequest.jsx";
import { InfoCont } from "./infoCont.jsx";
import { InfoListCont } from "./infoListCont.jsx";

const ClubSett = props => {
	const clubInfo = props.clubInfo;
	const clubName = clubInfo?.club_name;
	const clubMem = clubInfo?.club_members;
	const clubGenres = clubInfo?.club_genres;
	const clubAdmin = clubInfo?.club_admin;
	const clubId = clubInfo?.id;
	const users = props.users;
	const uids = props.uids;
	const setUIds = props.uids;
	const userAcc = props.userAcc;
	const { id, user_name } = userAcc;
	const userName = user_name;
	const userId = id;
	const setOpenSett = props.setOpenSett;
	const backImage = props.backgroundImage;
	const array = useArray();
	const openChat = useOpenChat();
	const setOpenChat = useSetOpenChat();
	const { mutate } = useUpdate();
	const isAd = userName == clubAdmin;

	const newGameClub = array.userClubs.filter(club => club != clubName);

	const handleLeave = e => {
		e.preventDefault();

		const newClubMem = clubMem.filter(mem => mem != userName);

		mutate({
			resource: "USER_ACCOUNT",
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

		users.forEach(user => {
			const { id, user_name } = user;
			if (clubMem.includes(user_name)) {
				mutate({
					resource: "USER_ACCOUNT",
					values: {
						game_club: newGameClub,
					},
					id,
				});
			} else setUIds(uids.map(uid => uid + 50));
		});

		DeleteOne("GAME_CLUBS", clubId);

		setOpenChat({
			...openChat,
			open: false,
		});		

	}

	return (
		<Paper sx={{height: '77%', width: '60%', position: 'absolute', top: '11%', left: '20%', 
			display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
			alignItems: 'center',}} elevation={4}>
			<Box sx={{height: '20%', width: '100%', backgroundImage: `url(${backImage})`, 
				backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat',}}>
				{/*image-box*/}
			</Box>
			{isAd && <InfoCont title="Club name" isAd={isAd} value={clubName} clubId={clubId} 
				clubMem={clubMem} prevName={clubName} users={users} />}
			{!isAd && <InfoCont title="Club name" value={clubName} />}
			{isAd && <InfoListCont title="Club members" isAd={isAd} value={clubMem} clubId={clubId} 
				users={users} clubName={clubName} clubAdmin={clubAdmin} />}
			{!isAd && <InfoListCont title="Club members" value={clubMem} />}
			<h6>{`Admin: ${clubAdmin}`}</h6>
			{isAd && <InfoListCont title="Club preferences" isAd={isAd} value={clubGenres} 
				clubId={clubId} setOpenSett={setOpenSett} users={users} />}
			{!isAd && <InfoListCont title="Club preferences" value={clubGenres} />}
			<p style={{margin: '0', cursor: 'pointer'}} onClick={handleLeave}>LEAVE CLUB</p>
			{isAd && <p style={{margin: '0', cursor: 'pointer', color: 'red'}} onClick={handleDelete}>
			Delete CLUB</p>}		
		</Paper>
		);
}

export { ClubSett }

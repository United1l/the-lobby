import { useState, useEffect } from "react";
import { useUpdate } from "@refinedev/core";
import { Box, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useArray, useArrayDispatch } from "../../arrayContext.jsx";
import { useOpenChat, useSetOpenChat } from "../../chatContext.jsx";
import { BoxCont } from "./boxCont.jsx";

const InfoCont = props => {
	const isAd = props.isAd;
	const title = props.title;
	const value = props.value;
	const clubId = props.clubId;
	const users = props.users;
	const prevName = props.prevName;
	const clubMem = props.clubMem;
	const [editName, setEditName] = useState(false);
	const [clubName, setClubName] = useState("");
	const { mutate } = useUpdate();
	const array = useArray();
	const openChat = useOpenChat();
	const setOpenChat = useSetOpenChat();

	const handleChange = e => {
		const val = e.target.value;
		setClubName(val);
	}

	const handleBack = e => {
		e.preventDefault();

		setEditName(false);
	}

	const handleEdit = e => {
		e.preventDefault();

		setEditName(true);
	}

	const handleUpdate = e => {
		e.preventDefault();

		mutate({
			resource: "GAME_CLUBS",
			values: {
				club_name: clubName,
			},
			id: clubId,
		});

		users.forEach(user => {
			const { id, user_name, game_club } = user;

			clubMem.forEach(mem => {
				if (mem == user_name) {
					arrayDispatch({
						type: 'Remove',
						userClub: prevName,
						user: array.userClubs,
						arr: [],
					});

					let newUserClub = [...array.userClubs, clubName];
					mutate({
						resource: "USER_ACCOUNTS",
						values: {
							game_club: newUserClub,
						},
						id: id,
					});
				}
			});
		});

		setOpenChat({
			...openChat,
			open: false,
		});
	}

	const newName = <Box sx={{display: 'flex', alignItems: 'center', height: '100%', width: '100%',
		justifyContent: 'space-evenly'}}>
		<p onClick={handleBack}>Back</p>
		<TextField type="text" label="New name" value={clubName} onChange={handleChange} 
			size="small" variant="standard" sx={{width: '70%',}} autoFocus />
		<SendIcon sx={{cursor: 'pointer'}} onClick={handleUpdate} />	
	</Box>;

	return (
		<BoxCont isClubName={true}>
			<h4>{title}</h4>
			<Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
				height: '30%', width: '100%'}}>
				{isAd? editName? newName: <Box sx={{display: 'flex', justifyContent: 'space-evenly',
					alignItems: 'center', height: '100%', width: '100%'}}>
					<p >{value}</p>
					<p style={{cursor: 'pointer'}} onClick={handleEdit}>Edit</p>
				</Box> : <p>{value}</p>}
			</Box>
		</BoxCont>
		);
}

export { InfoCont }
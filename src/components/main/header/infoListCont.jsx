import { useState, useEffect } from "react";
import { useUpdate } from "@refinedev/core";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { useArray, useArrayDispatch } from "../../arrayContext.jsx";
import { useOpenChat, useSetOpenChat } from "../../chatContext.jsx";
import { BoxCont } from "./boxCont.jsx";

const InfoListCont = props => {
	const isAd = props.isAd;
	const setOpenSett = props.setOpenSett;
	const title = props.title;
	const value = props.value;
	const users = props.users;
	const clubName = props.clubName;
	const clubAdmin = props.clubAdmin;
	const clubId = props.clubId;
	const { mutate } = useUpdate();
	const array = useArray();
	const openChat = useOpenChat();
	const setOpenChat = useSetOpenChat();
	const [checkedState, setCheckedState] = useState({ checkedItems: new Map(), checked: true, });

	const gameGenres = ["Single Player", "Multi-Player", "Online", "Offline", "Shooter",
		"Hack and Slash", "Lifestyle", "Other"];

	let isMem = title == "Club members";
	let renderedVals = value.map(val => {
		return <p style={{margin: '0'}} key={val}>{val}</p>
	});

	let removedUsers = [];

	const handleChange = e => {
		const name = e.target.name;
		const isChecked = e.target.checked;

		setCheckedState(prevState => ({
			checkedItems: prevState.checkedItems.set(name, isChecked),
			checked: isChecked,
		}));
	}

	if (isAd && isMem) {
		renderedVals = value.map(val => {
			return (
				<FormControlLabel control={<Checkbox name={val} 
					checked={checkedState.checkedItems.get(name)} onChange={handleChange} />} 
					label={val} key={val} />
			);
		});
	}  else if (isAd && !isMem) {
		renderedVals = gameGenres.map(genre => {
			let checked = checkedState.checkedItems.get(name);

			value.forEach(val => {
				if (val == genre) {
					checked = checkedState.checked;
				}
				return;
			});

			return (
				<FormControlLabel control={<Checkbox name={genre} 
					checked={checked} onChange={handleChange} />} 
					label={genre} key={genre} />
			);
		});
	}

	const handleRemove = e => {
		e.preventDefault();

		for (let [key, value] of checkedState.checkedItems) {
			if (value) removedUsers.push(key);
		}

		let newClubMem = [];
		for (let i = 0; i < removedUsers.length; i++) {
			newClubMem = value.filter(val => val != removedUsers[i]);
		}

		for (let i = 0; i < removedUsers.length; i++) {
			users.forEach(user => {
				const { id, user_name } = user;

				if (user_name == removedUsers[i]) {
					const newGameClub = array.userClubs.filter(club => club != clubName);

					mutate({
						resource: "USER_ACCOUNTS",
						values: {
							game_club: newGameClub,
						},
						id,
					});
				}
			});

			if (removedUsers[i] == clubAdmin) {
				const newAdmin = newClubMem[Math.floor(Math.random() * newClubMem.length - 1)];

				mutate({
					resource: "GAME_CLUBS",
					values: {
						club_admin: newAdmin,
					},
					id: clubId,
				});
			} 
		}

		mutate({
				resource: "GAME_CLUBS",
				values: {
					club_members: newClubMem,
					removed_users: removedUsers,
				},
				id: clubId,
			});

		setOpenChat({
			...openChat,
			open: false,
		});			

	}

	const handleUpdate = e => {
		e.preventDefault();

		let newGenres = [];
		for (let [key, value] of checkedState.checkedItems) {
			if (value) newGenres.push(key);
		}

		if (checkedState.checked) newGenres = [...newGenres, ...value];
		
		mutate({
			resource: "GAME_CLUBS",
			values: {
				club_genres: newGenres,
			},
			id: clubId,
		});

		setOpenSett(false);
	}

	return (
		<BoxCont>
			<h4 style={{margin: '0'}}>{title}</h4>
			<Box sx={{display: 'flex', flexDirection: 'column',alignItems: 'center',
				border: '1px solid gray', height: '80%', width: '80%', overflowY: 'scroll', 
				overflowX: 'hidden', borderRadius: '5px'}}>
				{renderedVals}
			</Box>
			{isAd? isMem? <p style={{cursor: 'pointer'}} onClick={handleRemove}>Remove</p>:
				<p style={{cursor: 'pointer'}} onClick={handleUpdate}>Update</p>: <></> }
		</BoxCont>
		);
}

export { InfoListCont }
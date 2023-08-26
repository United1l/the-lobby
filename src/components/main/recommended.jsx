import { useState, useEffect} from "react";
import { useMany, useUpdate } from "@refinedev/core";
import { Box, Button, Alert, AlertTitle } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AvatarDisp } from "../avatarDisplay.jsx";
import { useArray, useArrayDispatch } from "../arrayContext.jsx";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";
import { useOpenRecom, useSetOpenRecom } from "../recommendedContext.jsx";
import { GetGroupData } from "../dataRequest.jsx";

const Recommended = props => {
	const id = props.id;
	const userAcc = props.userAcc;
	const openRecom = useOpenRecom();
	const setOpenRecom = useSetOpenRecom();
	const [ids, setIds] = useState([1,2,3]);
	const array = useArray();
	const arrayDispatch = useArrayDispatch();
	const { mutate } = useUpdate();
	let clubNames = [];
	let avatarArray = [];
	let disp = 'none';

	useEffect(() => {
		const fetchClubs = setInterval(() => {
      		const newIds = ids.map(id => id + 3);
      		if (clubs.length > 2) setIds(newIds);
   	 	} ,6000);

		return () => {
      		clearInterval(fetchClubs)
    	}
	}, []);

    const { data, isLoading, isError } = useMany({
		resource: "GAME_CLUBS",
		ids
	});

	const clubs = data?.data ?? [];

	if (isLoading) {
    	return <div>Loading...</div>
  	}

  	if (isError) {
    	return <div>Something went wrong</div>
  	}

	if (clubs) {
		clubs.map(club => {
			const { club_name } = club;
			clubNames = [...clubNames, club_name];
		});
	}

	const preferredClubs = clubs.map(({ id, club_name, club_genres }) => {
			const genres = club_genres;

			genres.map(genre => {
				let checkPref = array.preferences.every(pref => {
					genre.includes(pref);
				});

				if (checkPref) return club_name;
				return; 
			});
		});
	
	if (typeof(preferredClubs[0]) == String) {
		avatarArray = preferredClubs.map(prefName => {
			return (
				<Grid xs={4} key={prefName}>
					<AvatarDisp title={prefName} src={""} alt={prefName} h={100} w={100} />
				</Grid>
				);
			});	
	} else {
		avatarArray = clubNames.map(name => {
			return (
				<Grid xs={4} key={name}>
					<AvatarDisp title={name} src={""} alt={name} h={100} w={100} />
				</Grid>
				);
			});
	}

	if (!openRecom) disp = 'flex';	 

	const updateUser = id => {
			mutate({
				resource: 'USER_ACCOUNT',
				values: {
					game_club: array.userClubs,
				},
				id: id,
			});
	}

	const handleSubmit = e => {
		e.preventDefault();

		array.userClubs.forEach(club => {
			if (userAcc.game_club?.includes(club)) {
				arrayDispatch({
					type: 'Remove',
					userClub: club,
					user: array.userClubs,
					arr: [],
				});
			}
		});

		updateUser(id);

		for (let i = 0; i < clubs.length; i++) {
			for (let j = 0; j < array.userClubs.length; i++) {
				try {
					const { id, club_name } = clubs[i];
				
					const clubId = id;
					if (array.userClubs[j] == club_name) {
						let newMem = [];
						newMem.push(userAcc.user_name);
						mutate({
							resource: "GAME_CLUBS",
							values: {
								club_members: newMem,
							},
							id: clubId,
						});
					}
				} catch (e) {
					console.log(`Error updating club members is ${e}`);
				}
			}
		}

		setOpenRecom(false);
	}

	const handleBack = e => {
		e.preventDefault();

		setOpenRecom(false);
	}

	return (
		<Box sx={{ height: '100%', width: '100%', display: disp, flexDirection: 'column',
			justifyContent: 'space-evenly', alignItems: 'center', position: 'absolute', 
			backgroundColor: 'white'}}>
			<ArrowBackIcon onClick={handleBack} sx={{alignSelf: 'flex-start', cursor: 'pointer', 
				margin: '0 1rem'}} size="small" color="secondary" />	
			<h2>Preferences</h2>
			<Alert severity="info">
				<AlertTitle>Info</AlertTitle>
				Clubs aligned with your preferences
			</Alert>
			<Grid container spacing={2} sx={{height: '40%', width: '80%', justifyContent: 'center'}}>
				{avatarArray}
			</Grid>
			<Button onClick={handleSubmit}>Submit</Button>			
		</Box>
		);
}

export { Recommended }
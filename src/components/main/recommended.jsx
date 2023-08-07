import { useState, useEffect} from "react";
import { useMany, useUpdate } from "@refinedev/core";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { AvatarDisp } from "../avatarDisplay.jsx";
import { useArray } from "../arrayContext.jsx";

const Recommended = props => {
	const id = props.id;
	const [ids, setIds] = useState([1,2,3]);
	const array = useArray();
	const openRecom = props.openRecom;
	const setOpenRecom = props.setOpenRecom;
	let disp = 'flex';
	let clubs = [];
	let clubNames = [];

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
      	ids,
      	liveMode: "auto",
  	});

  	if (isLoading) {
    	return <div>Loading...</div>
  	}

  	if (isError) {
    	return <div>Something went wrong</div>
  	}

  	clubs = data?.data ?? [];


	clubs.map(club => {
		const { club_name } = club;
		clubNames = [...clubNames, club_name];
	}) 

	const avatarArray = clubNames.map(name => {
		return (
			<Grid xs={4} key={name}>
				<AvatarDisp title={name} src={""} alt={name} h={100} w={100} />
			</Grid>
		);
	});

	if (!openRecom) disp = 'none';

	const updateUser = id => {
			const { mutate } = useUpdate();

			mutate({
				resource: 'USER_ACCOUNTS',
				values: {
					game_club: array.userClubs,
				},
				id: id,
			});
	}

	const handleSubmit = e => {
		e.preventDefault();

		updateUser(id);

		setOpenRecom(false);
	}

	const handleBack = e => {
		e.preventDefault();

		setOpenRecom(false);
	}

	return (
		<Box sx={{ height: '100%', width: '100%', display: disp, flexDirection: 'column',
			justifyContent: 'space-evenly', alignItems: 'center'}}>
			<p onClick={handleBack}>Back</p>
			<Grid container spacing={2} sx={{height: '40%', width: '80%', justifyContent: 'center'}}>
				{avatarArray}
			</Grid>
			<Button onClick={handleSubmit}>Submit</Button>			
		</Box>
		);
}

export { Recommended }
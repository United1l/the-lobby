import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdate } from "@refinedev/core";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { AvatarDisp } from "../../components/avatarDisplay.jsx";
import { useArray } from "../../components/arrayContext.jsx";
import { GetGroupData } from "../../components/dataRequest.jsx";

const Recommended = props => {
	const [ids, setIds] = useState([1,2,3]);
	let numArr = [];
	for (let i = 0; i < 50; i++) {
		let index = i + 1;
		numArr.push(index);
	}

	const [uids, setUIds] = useState(numArr);
	const [loggedUser, setLoggedUser] = useState("");
	const array = useArray();
	const navigate = useNavigate();
	const { mutate } = useUpdate();
	let clubs = [];

	useEffect(() => {
		const fetchClubs = setInterval(() => {
      		const newIds = ids.map(id => id + 3);
      		if (clubs.length > 2) setIds(newIds);
   	 	} ,6000);
    
		const loggedInUser = localStorage.getItem('user');

		if (loggedInUser) {
			setLoggedUser(loggedInUser);
		}

		return () => {
      		clearInterval(fetchClubs)
    	}
	}, []);

	const users = GetGroupData("USER_ACCOUNTS", uids);

	clubs = GetGroupData("GAME_CLUBS", ids);

	// check prefArr, gen clubs names that match prefArr items
	let clubNamesObj = new Set();
	let genres = [];

	if (clubs) { 
		const clubData = clubs.map(({ id, club_name, club_genres }) => {
			genres = [...genres, club_genres];

			genres.map(genre => {
				let checkPref = array.preferences.every(pref => {
					genre.includes(pref);
				});

				checkPref? clubNamesObj.add(club_name): clubNamesObj.delete(club_name);
			});
		});
	}

	

	const clubNamesArr = [...clubNamesObj];

	const handleSubmit = e => {
		e.preventDefault();

		if (array.userClubs.length != 0) {
			users.forEach(data => {
				const { id, user_name } = data;
				if (loggedUser == user_name) {
					mutate({
						resource: "USER_ACCOUNTS",
						values: {
							game_club: array.userClubs,
						},
						id: id,
					});

					for (let i = 0; i < clubs.length; i++) {
						for (let j = 0; j < array.userClubs.length; i++) {
							const { id, club_name } = clubs[i];
							const clubId = id;
							if (array.userClubs[j] == club_name) {
								let newMem = [];
								newMem.push(loggedUser);
								mutate({
									resource: "GAME_CLUBS",
									values: {
										club_members: newMem,
									},
									id: clubId,
								});
							}
						}
					}

					localStorage.setItem('id', id);

					// Go to dashboard page
					navigate('/dashboard');
				} else {
					const newIds = uids.map(id => id + 50);
					setUIds(newIds);
				}
			});

		} else {
			users.forEach(data => {
				const { id, user_name } = data;
				if (loggedUser == user_name) {
					localStorage.setItem('id', id);					
				} else {
					const newIds = uids.map(id => id + 50);
					setUIds(newIds);
				}
			});

			navigate('/dashboard');
		}	
	}

	

	return  (
		<Box sx={{height: '95vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
			<h2>Recommended Clubs</h2>
			<Clubs clubNames={clubNamesArr} />
			<Button variant="contained" onClick={handleSubmit}>Submit</Button>
		</Box>		
	);
}

const Clubs = props => {
	const [newClubs, setNewClubs] = useState([]);
	const clubNames = props.clubNames;

	clubNames.forEach(name => {
		(newClubs.includes(name))? "": setNewClubs([...newClubs, name]);
	});

	const avatarArray = newClubs.map(name => {
		return (
			<Grid xs={4} key={name}>
				<AvatarDisp title={name} src={""} alt={name} h={100} w={100} />
			</Grid>
		);
	});

	return(
		<Grid container spacing={2} sx={{height: '40%', width: '80%', justifyContent: 'center'}}>
			{avatarArray}
		</Grid>
		);
}

export { Recommended }
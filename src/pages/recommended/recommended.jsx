import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMany, useOne, useUpdate } from "@refinedev/core";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { AvatarDisp } from "../../components/avatarDisplay.jsx";
import { useArray, useArrayDispatch } from "../../components/arrayContext.jsx";



const Recommended = props => {
	const [ids, setIds] = useState([1,2,3]);
	const [id, setId] = useState(1);
	const [loggedUser, setLoggedUser] = useState("");
	const navigate = useNavigate();
	const array = useArray();

	const { data, isLoading, isError } = useMany({
			resource: "GAME_CLUBS",
			ids,
			liveMode: "auto",
	});

	const clubs = data?.data ?? [];
	console.log(clubs);

	useEffect(() => {	
		const fetchClubs = setInterval(() => {
			const newIds = ids.map(id => id + 3);
			if (clubs.length > 2) setIds(newIds);
		} ,6000);

		const loggedInUser = localStorage.getItem('user');

		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setLoggedUser(foundUser);
		}

		return () => {
			clearInterval(fetchClubs)
		}
	}, []);

	// check prefArr, gen clubs names that match prefArr items
	let clubNamesObj = new Set();
	let genres = [];

	const clubData = clubs.map(({ club_name, club_genres }) => {
		genres = [...genres, club_genres];

		genres.map(genre => {
			let checkPref = array.preferences.every(pref => {
				genre.includes(pref);
			});

			checkPref? clubNamesObj.add(club_name): clubNamesObj.delete(club_name);
		});
	});

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Something went wrong</div>
	}

	const clubNamesArr = [...clubNamesObj];


	const getUser = () => {
		const { data, isLoading, isError} = useOne({
			resource: "USER_ACCOUNTS",
			id,
		});

		const user = data?.data;

		if (isLoading) {
			return <div>Loading...</div>
		}

		if (isError) {
			return <div>Something went wrong</div>
		}

		const { user_name } = user;
		return user_name;
	}

	const updateUser = user => {
		if (loggedUser && user == loggedUser) {
			const { mutate } = useUpdate({
				resource: 'USER_ACCOUNTS',
				values: {
					game_club: array.userClubs,
				},
				invalidates: ["list", "many", "details"],
			});
		} else {
			setId(id + 1);
			getUser();
			updateUser(user);
		}	
	}

	const handleSubmit = e => {
		e.preventDefault();

		getUser();		
		updateUser(user_name);
		
		// Go to dashboard page
		navigate('/dashboard');
		
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
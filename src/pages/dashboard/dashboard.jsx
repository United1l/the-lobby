import { useState, useEffect, } from "react";
import { useMany, useOne, useUpdate } from "@refinedev/core";
import { Box, Button, Grid } from "@mui/material";
import { Header } from "../../components/header/header.jsx";
import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import { Main } from "../../components/main/main.jsx";
import { UserContextProvider } from "../../components/userAccountContext.jsx";
import { useArray, useArrayDispatch } from "../../components/arrayContext.jsx";

const Dashboard = props => {
	const [ids, setIds] = useState([1,2,3]);
	const [loggedUser, setLoggedUser] = useState("");
	const [matches, setMatches] = useState(
		window.matchMedia("(min-width: 768px)").matches
		);
	const [menu, setMenu] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	let display = 'none';
	let theme = {
		bg: 'white',
		textColor: 'black',
	};
	let clubs = [];
	let clubNamesObj = new Set();

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

		window.matchMedia("(min-width: 768px)").addEventListener('change', e => {
			setMatches(e.matches);
		});

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

  	if (clubs.length > 0) { 
		const clubData = clubs.map(({ club_name }) => {
				clubNamesObj.add(club_name);
		});
	}

  	const clubNamesArr = [...clubNamesObj];

	if (menu) {
		display = 'flex';
	} else display = 'none';

	if (darkMode) {
		theme.bg = 'black';
		theme.textColor = 'white';
	} else {
		theme.bg = 'white';
		theme.textColor = 'black';
	}

	return (
		<UserContextProvider>
			<Box sx={{height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', 
				background: theme.bg, color: theme.textColor, overflow: 'hidden'}}>
				<Box sx={{height: '1.8%', width: '100%', display: 'flex', alignItems: 'center', 
					justifyContent: 'center', position: 'absolute', top: '0', pb: '2px'}}>
					<p style={{fontWeight: 'bolder', fontSize: '9px'}}>The Lobby</p>	
				</Box>
				<Header menu={menu} setMenu={setMenu} darkMode={darkMode} setDarkMode={setDarkMode} 
					clubs={clubNamesArr} bigScreen={matches} />
				<Box sx={{height: '85%', width: '100%', display: 'flex' }}>
					<Sidebar loggedUser={loggedUser} display={display} menu={menu} setMenu={setMenu} 
						darkMode={darkMode} bigScreen={matches} />
					<Main darkMode={darkMode} bigScreen={matches} />
				</Box>
			</Box>
		</UserContextProvider>
		);
}

export { Dashboard }
import { useState, useEffect } from "react";
import { useOne, useSubscription } from "@refinedev/core";
import { Box } from "@mui/material";
import { SetUserName } from "../user-form/setUsername.jsx";
import { Header } from "../../components/header/header.jsx";
import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import { Main } from "../../components/main/main.jsx";
import { ChatContextProvider, useOpenChat, useSetOpenChat } from "../../components/chatContext.jsx";
import { RecommendedContextProvider, useOpenRecom, useSetOpenRecom } from "../../components/recommendedContext.jsx";
import { useColorContext } from "../../contexts/color-mode/colorContext.jsx";

const Dashboard = props => {
	const [userId, setUserId] = useState(0);
	const [menu, setMenu] = useState(false);
	const darkMode = props.darkMode;
	const setDarkMode = props.setDarkMode;
	const [matches, setMatches] = useState(
		window.matchMedia("(min-width: 768px)").matches
		);
	const [openUserD, setUserD] = useState(true);			
	const colorContext = useColorContext();
	const primary = colorContext.primary;
	let display = 'none';
	let theme = {
		bg: 'white',
		textColor: 'black',
	};
	let userAcc = null;

	useEffect(() => {
		window.matchMedia("(min-width: 768px)").addEventListener('change', e => {
			setMatches(e.matches);
		});

		const loggedUser = localStorage.getItem("userId") || sessionStorage.getItem("userId");

		if (loggedUser) setUserId(loggedUser);

	}, []);

	useSubscription({
		channel: "resources/GAME_CLUBS",
		types: ["*"],
	});

	useSubscription({
		channel: "resources/USER_ACCOUNT",
		types: ["*"],
	});
		
	userAcc = getUser(userId);

	const noClubs = userAcc?.game_club == null;
	const isUsername = userAcc?.user_name || false;

	if (menu) display = 'flex';

	if (darkMode) {
		theme.bg = '#6c757d';
	}

	return (
		<ChatContextProvider>
			<RecommendedContextProvider def={noClubs}>
				<Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', 
				background: theme.bg, position: 'relative'}} className="dashboard">
				{!matches && <Box sx={{height: '1.8%', width: '100%', display: 'flex', alignItems: 'center', 
					justifyContent: 'center', position: 'absolute', top: '0', pb: '2px'}}>
					<p style={{fontWeight: 'bolder', fontSize: '9px', color: primary}}>The Lobby</p>	
				</Box>}
				<Header menu={menu} setMenu={setMenu} darkMode={darkMode} setDarkMode={setDarkMode} 
					bigScreen={matches} />
				
				<Sidebar loggedUser={isUsername} display={display} setMenu={setMenu} darkMode={darkMode}
				 menu={menu} bigScreen={matches} userAcc={userAcc} />
				<Box sx={{height: '95%', width: '100%', position: 'relative'}}>
					<Main darkMode={darkMode} bigScreen={matches} userAcc={userAcc} />
				</Box>
					{!isUsername && <SetUserName userId={userId} openUserD={openUserD} setUserD={setUserD} />}
				</Box>
			</RecommendedContextProvider>			
		</ChatContextProvider>
	);
}

const getUser = userId => {
	const { data, isLoading } = useOne({
		resource: "USER_ACCOUNT",
		id: userId,
	});

	const user = data?.data;

	if (isLoading) {
		return <div>Loading...</div>
	}

	return user;
}


export { Dashboard }
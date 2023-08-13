import { useState, useEffect } from "react";
import { useOne } from "@refinedev/core";
import { Box } from "@mui/material";
import { SetUserName } from "../user-form/setUsername.jsx";
import { Header } from "../../components/header/header.jsx";
import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import { Main } from "../../components/main/main.jsx";
import { ChatContextProvider, useOpenChat, useSetOpenChat } from "../../components/chatContext.jsx";

const Dashboard = props => {
	const { data } = useGetIdentity();
	const userId = data.user.id;
	const [menu, setMenu] = useState(false);
	const [darkMode, setDarkMode] = useState(false);
	const [matches, setMatches] = useState(
		window.matchMedia("(min-width: 768px)").matches
		);		

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

	}, []);	
		
	userAcc = getUser(userId);

	const { user_name } = userAcc;

	if (menu) display = 'flex';

	if (darkMode) {
		theme.bg = 'black';
		theme.textColor = 'white';
	}

	return (
		<ChatContextProvider>
			<Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', 
				background: theme.bg, color: theme.textColor,}} className="dashboard">
				{!matches && <Box sx={{height: '1.8%', width: '100%', display: 'flex', alignItems: 'center', 
					justifyContent: 'center', position: 'absolute', top: '0', pb: '2px'}}>
					<p style={{fontWeight: 'bolder', fontSize: '9px'}}>The Lobby</p>	
				</Box>}
				<Header menu={menu} setMenu={setMenu} darkMode={darkMode} setDarkMode={setDarkMode} 
					bigScreen={matches} />
				
				<Sidebar loggedUser={user_name} display={display} setMenu={setMenu} darkMode={darkMode}
				 menu={menu} bigScreen={matches} userAcc={userAcc} />
				<Box sx={{height: '95%', width: '100%', position: 'relative'}}>
					<Main darkMode={darkMode} bigScreen={matches} userAcc={userAcc} />
				</Box>
				{!user_name && <SetUserName />}
			</Box>
		</ChatContextProvider>
	);
}

const getUser = userId => {
	const { data, isLoading, isError} = useOne({
		resource: "USER_ACCOUNTS",
		id: userId,
	});

	const user = data?.data;

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Something went wrong</div>
	}

	return user;
}


export { Dashboard }
import { useState, useEffect } from "react";
import { useSubscription, useMany } from "@refinedev/core";
import { Box } from "@mui/material";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";
import { Recommended } from "./recommended.jsx";
import { Chatroom } from "./chatroom.jsx";

const Main = props => {
	const bigScreen = props.bigScreen;
	const userAcc = props.userAcc;
	const [ids, setIds] = useState([1,2,3]);
	const openChat = useOpenChat();
	const id = userAcc.id || "";
	const userClubs = userAcc.game_club || [];
	let w = '100%';
	let pos = 'relative';

	if (bigScreen) {
		w = '80%';
		pos = 'absolute';
	}

	useEffect(() => {
		const fetchClubs = setInterval(() => {
      		const newIds = ids.map(id => id + 3);
      		if (clubs.length > 2) setIds(newIds);
   	 	} ,6000);

		return () => {
      		clearInterval(fetchClubs)
    	}
	}, []);

	useSubscription({
		channel: "resources/GAME_CLUBS",
		types: ["UPDATE"],
	});

	const { data, isLoading } = useMany({
		resource: "GAME_CLUBS",
		ids
	});

	const clubs = data?.data ?? [];

	if (isLoading) return <div>Loading...</div>;


	return (
		<Box sx={{height: '100%', width: w, position: pos, right: '0', display: 'flex', 
			justifyContent: 'center', alignItems: 'center', flexGrow: '1'}}>
			{<Recommended id={id} userAcc={userAcc} />}
			{!openChat.open && <p>Select a club to open chat</p>}
			{openChat.open && <Chatroom userAcc={userAcc} clubs={clubs}/>}
		</Box>
		);
}

export { Main }
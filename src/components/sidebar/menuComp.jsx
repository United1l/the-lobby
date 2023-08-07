import { useState } from "react";
import { Box, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";

const MenuCont = props => {
	const children = props.children;
	const data = props.data;
	const isBoard = props.isBoard;
	const title1 = props.title1;
	const title2 = props.title2;
	const openChat = useOpenChat();
	const setOpenChat = useSetOpenChat();
	const [listOpen, setListOpen] = useState(false);
	let renderList = [];
	let listDisp = 'none';

	const handleList = e => {
		e.preventDefault();

		setListOpen(!listOpen);
	}

	const handleClub = e => {
		e.preventDefault();

		const name = e.target.textContent;

		setOpenChat({
			...openChat,
			open: true,
			text: name,
		});
	}

	renderList = children.map(child => {
		if (isBoard) {
			return <ListItemComp text={child} key={child} />;	
		}

		return <ListItemComp text={child} handleClub={handleClub} cursor="pointer" key={child} />; 
	});	

	if (listOpen) {
		listDisp = 'block';
	} else listDisp = 'none';

	return (
		<Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
			alignItems: 'center', overflowX: 'hidden', overflowY: 'auto'}}>
			{title1}
			<Button onClick={handleList}>{title2}</Button>
			<List sx={{width: '80%', display: listDisp, bgcolor: 'background.paper'}}>
				{renderList}
			</List>		
		</Box>
	);
}

const ListItemComp = props => {
	const text = props.text;
	const handleClub = props.handleClub;
	const cursor = props.cursor ?? "";

	return (
		<>
			<ListItem>
				<ListItemText primary={text} onClick={handleClub} sx={{cursor: cursor,}} />
			</ListItem>
			<Divider />
		</>
	);
}

export { MenuCont }
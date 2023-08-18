import { useState } from "react";
import { useUpdate } from "@refinedev/core";
import { Box, Button, TextField, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";
import { useOpenRecom, useSetOpenRecom } from "../recommendedContext.jsx";

const MenuCont = props => {
	const children = props.children;
	const user = props.user;
	const isBoard = props.isBoard;
	const title1 = props.title1;
	const title2 = props.title2;
	const setMenu = props.setMenu;
	const { mutate } = useUpdate();
	const openChat = useOpenChat();
	const setOpenChat = useSetOpenChat();
	const openRecom = useOpenRecom();
	const setOpenRecom = useSetOpenRecom();
	const [listOpen, setListOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [game1, setGame1] = useState("");
	const [game2, setGame2] = useState("");
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

	const handleRecom = e => {
		e.preventDefault();

		setOpenChat({
			...openChat,
			open: false,
		});

		setOpenRecom(!openRecom);
	}

	const handleGame1 = e => {
		e.preventDefault();
		
		setGame1(e.target.value);
	}

	const handleGame2 = e => {
		e.preventDefault();

		setGame2(e.target.value);
	}

	const handleEdit = e => {
		e.preventDefault();

		setEdit(!edit);
	}

	const handleUpdate = e => {
		e.preventDefault();

		if (!game1 && !game2) return;

		let gameArr = [game1, game2];

		mutate({
			resource: 'USER_ACCOUNT',
			values: {
				games: gameArr,
			},
			id: user?.id,
		});

		setMenu(false);
	}

	renderList = children?.map(child => {
		if (isBoard) {
			if (children) {
				if (edit) {
					return; 
				}

				return <ListItemComp text={child} key={child} />;	
			}	
		}

		if (children) {
			return <ListItemComp text={child} handleClub={handleClub} cursor="pointer" key={child} />;
		}

		return <h5 onClick={handleRecom} style={{cursor: 'pointer'}}>Recommended</h5>; 
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
			{(isBoard && edit) && <Box sx={{display: 'flex', flexDirection: 'column',
					height: '60%', width: '80%'}}>
					<TextField type="text" label="Game 1" value={game1} onChange={handleGame1} 
						variant="outlined" sx={{mb: '0.5rem'}} />
					<TextField type="text" label="Game 2" value={game2} onChange={handleGame2} 
						variant="outlined" sx={{mb: '0.5rem'}} />
				</Box>}	
			{isBoard && <h5 style={{cursor: 'pointer'}} onClick={handleEdit}>edit</h5>}
			{(isBoard && edit) && <h5 style={{cursor: 'pointer'}} onClick={handleUpdate}>update</h5>}		
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
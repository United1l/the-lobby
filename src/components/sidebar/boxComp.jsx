import { useState } from "react";
import { useUpdate } from "@refinedev/core";
import { Box, Avatar, TextField } from "@mui/material";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";
import { useOpenRecom, useSetOpenRecom } from "../recommendedContext.jsx";

const BoxCont = props => {
const children = props.children;
const isBoard = props.isBoard;
const title1 = props.title1;
const title2 = props.title2;
const openChat = useOpenChat();
const setOpenChat = useSetOpenChat();
const openRecom = useOpenRecom();
const setOpenRecom = useSetOpenRecom();
const [edit, setEdit] = useState(false);
const [game1, setGame1] = useState("");
const [game2, setGame2] = useState("");
let renderChildren = [];

const handleClick = e => {
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

		setEdit(false);
	}

renderChildren = children?.map(child => {
	if (isBoard) {
		if (children) {
			if (edit) {
				return; 
			}

			return (
				<Box key={child}
				sx={{height: '70%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
					<h5>{child}</h5>
				</Box>
			);	
		}
	}

	if (children) {
		return (
			<Box key={child} 
				sx={{height: '70%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
				<Avatar src="" alt={child} sx={{height: '24px', width: '24px'}} />
				<h4 onClick={handleClick} style={{cursor: 'pointer',}}>{child}</h4>
			</Box>
		);
	}

	return <h5 onClick={handleRecom} style={{cursor: 'pointer'}}>Recommended</h5>;
});

return (
	<Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
	 justifyContent: 'space-evenly'}}>
		{title1}
		{title2}
		<Box sx={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly',
			overflowY: 'auto', overflowX: 'hidden'}}>
			{renderChildren}
		</Box>
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

export { BoxCont }
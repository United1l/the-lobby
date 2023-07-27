import { useState } from "react";
import { Box, Button, List, ListItem, ListItemText, Divider } from "@mui/material";

const MenuCont = props => {
	const children = props.children;
	const data = props.data;
	const title1 = props.title1;
	const title2 = props.title2;
	const [listOpen, setListOpen] = useState(false);
	let renderList = [];
	let listDisp = 'none';

	const handleClick = e => {
		e.preventDefault();

		setListOpen(!listOpen);
	}

	renderList = children.map(child => {
		return (
			<>
				<ListItem key={child}>
					<ListItemText primary={child} />
				</ListItem>
				<Divider />
			</>
			);
	});

	if (listOpen) {
		listDisp = 'block';
	} else listDisp = 'none';

	return (
		<Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
			alignItems: 'center', overflowX: 'hidden', overflowY: 'auto'}}>
			<Button onClick={handleClick}>{title1}</Button>
			{title2}
			<List sx={{width: '80%', display: listDisp, bgcolor: 'background.paper'}}>
				{renderList}
			</List>		
		</Box>
	);
}

export { MenuCont }
import { useState, useEffect } from "react";
import { Box, Avatar, Button, TextField, InputAdornment, Paper } from "@mui/material";
import { GetGroupData } from "../dataRequest.jsx";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";

const SearchBox = props => {
	const bigScreen = props.bigScreen;
	const theme = props.theme;
	const display = props.display;
	const searchIcon = props.searchIcon;
	const setSearch = props.setSearch;
	const openChat = useOpenChat();
	const setOpenChat = useSetOpenChat();
	const [searchItem, setSearchItem] = useState("");
	const [ids, setIds] = useState([1,2,3]);
	let results = [];
	let renderResults = [];
	let clubNamesObj = new Set();
	let w = '100%';
	let right = '';
	let top = '0';

	useEffect(() => {
		const fetchClubs = setInterval(() => {
      		const newIds = ids.map(id => id + 3);
      		if (clubs.length > 2) setIds(newIds);
   	 	} ,6000);

		return () => {
      		clearInterval(fetchClubs)
    	}
	}, []);

  	const clubs = GetGroupData("GAME_CLUBS", ids);

  	if (clubs.length > 0) { 
		const clubData = clubs.map(({ club_name }) => {
			clubNamesObj.add(club_name);
		});
	}

	const clubNamesArr = [...clubNamesObj];

	const handleClick = e => {
		e.preventDefault();

		const name = e.target.textContent;

		setOpenChat({
			...openChat,
			text: name,
			open: true,
		});
	}

	const handleClose = e => {
		e.preventDefault();

		setSearch(false);
	}

	const handleChange = e => {
		const value = e.target.value;
		
		setSearchItem(value);
	}

	clubNamesArr.forEach(club => {
			const arr = [...club.toLowerCase()];
			if (arr.includes(searchItem) || (club.toLowerCase() == searchItem.toLowerCase())) {
				results = [...results, club];
			}
		});

	renderResults = results.map(result => {
		return (
			<Box key={result} 
				sx={{height: '70%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
				<Avatar src="" alt={result} sx={{height: '24px', width: '24px'}} />
				<h4 onClick={handleClick} style={{cursor: 'pointer',}}>{result}</h4>
			</Box>
		);
	});

	if (bigScreen) {
		w = '400px';
		right = '10%';
		top = '5.86%';
	}

	return (
		<Paper sx={{display: display, height: '30%', width: w, position: 'absolute', top: top, right: right, zIndex: '5',
			backgroundColor: theme.bg, color: theme.textColor, flexDirection: 'column', justifyContent: 'space-between', 
			alignItems: 'center', p: '1rem'}} elevation={4}>
			<TextField variant="outlined" type="text" label="Search for a club" value={searchItem} 
				onChange={handleChange} InputProps={{
					endAdornment: <InputAdornment position="end">{searchIcon}</InputAdornment>
				}} />
			<Box sx={{height: '40%', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center',
				overflowY: 'auto', overflowX: 'hidden'}}>
				{renderResults}
			</Box>
			<Button onClick={handleClose}>Close</Button>
		</Paper>
		);
}

export { SearchBox }
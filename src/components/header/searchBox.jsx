import { useState } from "react";
import { Box, Button, Grid, InputAdornment, Avatar, Badge, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";

const SearchBox = props => {
	const clubs = props.clubs;
	const theme = props.theme;
	const display = props.display;
	const searchIcon = props.searchIcon;
	const setSearch = props.setSearch;
	const [searchItem, setSearchItem] = useState("");
	let results = [];
	let renderResults = [];

	const handleClose = e => {
		e.preventDefault();

		setSearch(false);
	}

	const handleChange = e => {
		const value = e.target.value;
		
		setSearchItem(value);
	}

	clubs.forEach(club => {
			const arr = [...club.toLowerCase()];
			if (arr.includes(searchItem) || (club.toLowerCase() == searchItem.toLowerCase())) {
				results = [...results, club];
			}
		});

	renderResults = results.map(result => {
		return <p key={result}>{result}</p>;
	})

	return (
		<Box sx={{display: display, height: '30%', width: 'auto', position: 'absolute', top: '0', zIndex: '5',
			backgroundColor: theme.bg, color: theme.textColor, flexDirection: 'column', justifyContent: 'space-between', 
			alignItems: 'flex-end', pt: '1rem'}}>
			<TextField variant="outlined" type="text" label="Search" value={searchItem} 
				onChange={handleChange} InputProps={{
					endAdornment: <InputAdornment position="end">{searchIcon}</InputAdornment>
				}} />
			<Box sx={{height: '40%', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				{renderResults}
			</Box>
			<Button onClick={handleClose}>Close</Button>
		</Box>
		);
}

export { SearchBox }
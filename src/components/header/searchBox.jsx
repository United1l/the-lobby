import { useState, useEffect } from "react";
import { useMany } from "@refinedev/core";
import { Box, Button, Grid, InputAdornment, Avatar, Badge, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";

const SearchBox = props => {
	const theme = props.theme;
	const display = props.display;
	const searchIcon = props.searchIcon;
	const setSearch = props.setSearch;
	const [searchItem, setSearchItem] = useState("");
	const [ids, setIds] = useState([1,2,3]);
	let results = [];
	let renderResults = [];
	let clubs = [];
	let clubNamesObj = new Set();

	useEffect(() => {
		const fetchClubs = setInterval(() => {
      		const newIds = ids.map(id => id + 3);
      		if (clubs.length > 2) setIds(newIds);
   	 	} ,6000);

		return () => {
      		clearInterval(fetchClubs)
    	}
	}, []);

	const { data, isError } = useMany({
      		resource: "GAME_CLUBS",
      		ids,
      		liveMode: "auto",
  		});

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
		return <p key={result}>{result}</p>;
	})

	return (
		<Box sx={{display: display, height: '30%', width: 'auto', position: 'absolute', top: '0', zIndex: '5',
			backgroundColor: theme.bg, color: theme.textColor, flexDirection: 'column', justifyContent: 'space-between', 
			alignItems: 'flex-end', pt: '1rem'}}>
			<TextField variant="outlined" type="text" label="Search for a club" value={searchItem} 
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Alert, AlertTitle } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { AvatarDisp } from "../../components/avatarDisplay.jsx";

const Preferences = props => {
	const navigate = useNavigate();
	const gameGenres = [{title: "Single Player", alt: "single player games"}, {title: "Multi-Player", alt: "multi-player games"}, 
		{title: "Online", alt: "online games"}, {title: "Offline", alt: "offline games"}, 
		{title: "Shooter", alt: "shooter"}, {title: "Hack and Slash", alt: "hack and slash games"}, 
		{title: "Lifestyle", alt: "lifestyle games"}, {title: "Other", alt: "other game genres"}];

	const [titleIndex, setTitleIndex] = useState({
		index1: 0,
		index2: 1,
	});

	let gameCatData = {
		title1: gameGenres[titleIndex.index1].title,
		title2: gameGenres[titleIndex.index2].title,
		alt1: gameGenres[titleIndex.index1].alt,
		alt2: gameGenres[titleIndex.index2].alt,
		src1: "",
		src2: "",
	}	

	const handleBack = e => {
		e.preventDefault();

		navigate('/dashboard');
	}
	
	// Change the values of the avatarDisp titles
	const handleProceed = e => {
		e.preventDefault();

		const atEnd = titleIndex.index1 == gameGenres.length - 2 || titleIndex.index2 == gameGenres.length;

		atEnd? navigate('/dashboard') : setTitleIndex({
			...titleIndex,
			index1: titleIndex.index1 + 2,
			index2: titleIndex.index2 + 2,
		});
	}

	const OneRowComp = props => { 
		return (
			<Box sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
				{props.children}
			</Box>
		); 
	}

	const gameCategory = <OneRowComp>
			<AvatarDisp title={gameCatData.title1} src={gameCatData.src1} 
				alt={gameCatData.alt1} h={100} w={100} pref={true} />
			<AvatarDisp title={gameCatData.title2} src={gameCatData.src2} 
				alt={gameCatData.alt2} h={100} w={100} pref={true} />
		</OneRowComp>;

	return(
		<Box sx={{height: '95vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center',
			position: 'relative'}}>
			<p style={{position: 'absolute', top: '2%', left: '2%', cursor: 'pointer', margin: '0 1rem'}} 
					onClick={handleBack}>
					Back
				</p>
			<h2>Preferences</h2>
			<Alert severity="info">
				<AlertTitle>Info</AlertTitle>
				Preferences are used to generate recommended clubs.<br />
				Every time it's opened means you're resetting it.
			</Alert>
			<Box sx={{width: '50%', height: '60%',}}>{gameCategory}</Box>
			<Button variant="contained" onClick={handleProceed}>Proceed</Button>
		</Box>
		);
}


export { Preferences }
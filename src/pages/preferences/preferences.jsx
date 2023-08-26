import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Alert, AlertTitle } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AvatarDisp } from "../../components/avatarDisplay.jsx";
import ryu from "../images/genres/ryu.png";
import ichigo from "../images/genres/ichigo.png";
import olaf from "../images/genres/olaf.png";
import shooting from "../images/genres/shooting.jpg";
import yoda from "../images/genres/yoda.png";
import apex from "../images/genres/apex-legends.png";
import sekiro from "../images/genres/sekiro.jpg";
import valorant from "../images/genres/valorant.jpg";

const Preferences = props => {
	const navigate = useNavigate();
	const gameGenres = [{title: "Single Player", alt: "single player games", src: ryu}, 
		{title: "Multi-Player", alt: "multi-player games", src: apex}, 
		{title: "Online", alt: "online games", src: valorant}, {title: "Offline", alt: "offline games", src: sekiro}, 
		{title: "Shooter", alt: "shooter", src: shooting}, {title: "Hack and Slash", alt: "hack and slash games", src: ichigo}, 
		{title: "Lifestyle", alt: "lifestyle games", src: olaf}, {title: "Other", alt: "other game genres", src: yoda}];

	const [titleIndex, setTitleIndex] = useState({
		index1: 0,
		index2: 1,
	});

	let gameCatData = {
		title1: gameGenres[titleIndex.index1].title,
		title2: gameGenres[titleIndex.index2].title,
		alt1: gameGenres[titleIndex.index1].alt,
		alt2: gameGenres[titleIndex.index2].alt,
		src1: gameGenres[titleIndex.index1].src,
		src2: gameGenres[titleIndex.index2].src,
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
		<Box sx={{height: '95vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', 
		alignItems: 'center', position: 'relative'}}>
			<ArrowBackIcon onClick={handleBack} sx={{position: 'absolute', top: '2%', left: '2%', cursor: 'pointer', 
				margin: '0 1rem'}} size="small" color="secondary" />	
			<h2>Preferences</h2>
			<Alert severity="info">
				<AlertTitle>Info</AlertTitle>
				Preferences are used to generate recommended clubs.<br />
				Every time it's opened means you're resetting it.
			</Alert>
			<Box sx={{height: '60%', width: '70%'}} 
				maxWidth={500} minWidth={130}>{gameCategory}</Box>
			<Button variant="contained" onClick={handleProceed}>Proceed</Button>
		</Box>
		);
}


export { Preferences }
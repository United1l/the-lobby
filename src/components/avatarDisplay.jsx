import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import { useArray, useArrayDispatch } from "./arrayContext.jsx";

const AvatarDisp = props => {
	const [click, setClick] = useState(false);
	const array = useArray();
	const arrayDispatch = useArrayDispatch();

	const handleClick = e => {
		e.preventDefault();
		const target = e.target;
		const { textContent } = target;

		setClick(!click);

		if (props.pref) {
			array.preferences.includes(textContent)? 
				arrayDispatch({
					type: 'Remove',
					preference: textContent,
					arr: array.preferences,
					user: []
				}):arrayDispatch({
					type: 'Add',
					preference: textContent,
					arr: array.preferences,
					user: []
				});
		} else {
			array.userClubs.includes(textContent)? 
			arrayDispatch({
				type: 'Remove',
				userClub: textContent,
				user: array.userClubs,
				arr: [],
			}):arrayDispatch({
				type: 'Add',
				userClub: textContent,
				user: array.userClubs,
				arr: [],
			});
		}
	}


	
	return (
		<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', 
			alignItems: 'center',}}>
			<Avatar src={props.src} alt={props.alt} sx={{height: props.h, width: props.w, }} />
			<h3 onClick={handleClick}
				style={{display: 'inline-flex', alignItems: 'center', cursor: 'pointer',}}>
				{props.title}<span>{(click && <CheckIcon />)}</span>
			</h3>
		</Box> 
		);
}

export { AvatarDisp }

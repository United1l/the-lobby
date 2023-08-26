import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useArray, useArrayDispatch } from "../arrayContext.jsx";
import { BoxCont } from "./boxComp.jsx";
import { MenuCont } from "./menuComp.jsx";

const ClubInfo = props => {
	const bigScreen = props.bigScreen;
	const userAcc = props.userAcc;
	const theme = props.theme;
	const navigate = useNavigate();
	const gameClubs = userAcc?.game_club;
	let title1W = '30%';

	if (bigScreen) {
		title1W = '70%';
	}

	const handleCreate = e => {
		e.preventDefault();

		navigate('/create');
	}

	const title1 = <Box sx={{width: title1W , height: '14%', display: 'flex', justifyContent: 'space-evenly', 
			alignItems: 'center', borderRadius: '10px', backgroundColor: '#adb5db', cursor: 'pointer', p: '1rem'}}
				onClick={handleCreate}>
			<AddBoxIcon fontSize="small" color="primary" />
			<h3>Create a club</h3>
		</Box>;
	const title2 = <h3>Clubs</h3>;

	return (
		<Box sx={{height: '50%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
				mt: '1.5rem' }}>
			{bigScreen? <BoxCont title1={title1} title2={title2}>{gameClubs}</BoxCont> : 
			<MenuCont title1={title1} title2={title2} theme={theme}>{gameClubs}</MenuCont>}
		</Box>
		);
}

export { ClubInfo }
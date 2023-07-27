import { Box, Button, Grid } from "@mui/material";
import { useArray, useArrayDispatch } from "../arrayContext.jsx";
import { BoxCont } from "./boxComp.jsx";
import { MenuCont } from "./menuComp.jsx";

const ClubInfo = props => {
	const bigScreen = props.bigScreen;
	const userAcc = props.userAcc;
	const clubs = userAcc?.game_club ?? [];
	const userClubs = ["Spider-tingle", "Batman"];
	const title1 = <h3>Clubs</h3>;
	const title2 = <h4>Create a club</h4>;

	return (
		<Box sx={{height: '50%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			{bigScreen? <BoxCont title1={title1} title2={title2}>{userClubs}</BoxCont> : 
				<MenuCont title1={title1} title2={title2}>{userClubs}</MenuCont>}
		</Box>
		);
}

export { ClubInfo }
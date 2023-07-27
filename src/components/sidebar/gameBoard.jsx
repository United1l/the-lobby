import { useState, useEffect, } from "react";
import { Box, Button, Grid } from "@mui/material";
import { BoxCont } from "./boxComp.jsx";
import { MenuCont } from "./menuComp.jsx";

const GameBoard = props => {
	const bigScreen = props.bigScreen;
	const userAcc = props.userAcc;
	const userGames = ["Apex legends", "GTA V", "Valorant"];
	const isBoard = true;
	const title1 = <h3>Currently playing</h3>;

	return (
		<Box sx={{height: '50%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			{bigScreen? <BoxCont title1={title1} isBoard={isBoard}>{userGames}</BoxCont> : 
				<MenuCont title1={title1}>{userGames}</MenuCont>}
		</Box>
		);
}

export { GameBoard }
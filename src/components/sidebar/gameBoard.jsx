import { useState, useEffect, } from "react";
import { Box, Button, Grid } from "@mui/material";
import { BoxCont } from "./boxComp.jsx";
import { MenuCont } from "./menuComp.jsx";

const GameBoard = props => {
	const bigScreen = props.bigScreen;
	const userAcc = props.userAcc;
	const userGames = ["Apex legends", "GTA V", "Valorant"];
	const isBoard = true;
	const title2 = <h3>Currently playing</h3>;

	return (
		<Box sx={{height: '50%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			{bigScreen? <BoxCont title2={title2} isBoard={isBoard}>{userGames}</BoxCont> : 
				<MenuCont title2={title2} isBoard={isBoard}>{userGames}</MenuCont>}
		</Box>
		);
}

export { GameBoard }
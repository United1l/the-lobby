import { Box } from "@mui/material";

const BoxCont = props => {
	const isClubName = props.isClubName;
	let height = '30%';

	if (isClubName) height = '15%';

	return(
		<Box sx={{height: height, width: '80%', display: 'flex', flexDirection: 'column', 
			justifyContent: 'space-evenly'}}>
			{props.children}
		</Box>
		);
}

export { BoxCont }

import { Box } from "@mui/material";

const IconsWrapper = props => {
	const bigScreen = props.bigScreen;
	let def = 'flex';

	if (bigScreen) def = 'none';   

	return (
		<Box sx={{height: '30px', width: '32px', display: def, alignItems: 'center', backgroundColor: props.bgColor, 
			justifyContent: 'center', border: '1px solid gray', borderRadius: '6px', cursor: props.cursor,}}
			onClick={props.onClick}>
			{props.children}
		</Box>
		);
}

export { IconsWrapper }
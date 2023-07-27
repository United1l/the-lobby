import { Box, Button, Grid, Avatar } from "@mui/material";

const BoxCont = props => {
const children = props.children;
const isBoard = props.isBoard;
const title1 = props.title1;
const title2 = props.title2;
let renderChildren = [];

renderChildren = children.map(child => {
	if (isBoard) {
		return (
			<Box key={child}
				sx={{height: '70%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
				<h5>{child}</h5>
			</Box>
		);		
	}

	return (
		<Box key={child}
			sx={{height: '70%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
			<Avatar src="" alt={child} sx={{height: '35px', width: '35px'}} />
			<h4>{child}</h4>
		</Box>
		);
});

return (
	<Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
		{title1}
		{title2}
		<Box sx={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
			{renderChildren}
		</Box>
	</Box>
	);
}

export { BoxCont }
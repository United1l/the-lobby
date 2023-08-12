import { Box, Avatar } from "@mui/material";
import { useOpenChat, useSetOpenChat } from "../chatContext.jsx";

const BoxCont = props => {
const children = props.children;
const isBoard = props.isBoard;
const title1 = props.title1;
const title2 = props.title2;
const openChat = useOpenChat();
const setOpenChat = useSetOpenChat();
let renderChildren = [];

const handleClick = e => {
	e.preventDefault();

	const name = e.target.textContent;

	setOpenChat({
		...openChat,
		open: true,
		text: name,
	});
}

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
			<Avatar src="" alt={child} sx={{height: '24px', width: '24px'}} />
			<h4 onClick={handleClick} style={{cursor: 'pointer',}}>{child}</h4>
		</Box>
		);
});

return (
	<Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
	 justifyContent: 'space-evenly'}}>
		{title1}
		{title2}
		<Box sx={{width: '70%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>
			{renderChildren}
		</Box>
	</Box>
	);
}

export { BoxCont }
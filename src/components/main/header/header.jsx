import { Box, Button, Grid } from "@mui/material";
import { useOpenChat, useSetOpenChat } from "../../chatContext.jsx";

const Header = props => {
	const headerInfo = props.headerInfo;
	const openSett = props.openSett;
	const setOpenSett = props.setOpenSett;
	const clubName = <h5 style={{margin: '0'}}>{headerInfo.club_name}</h5>;
	const clubMem = <p style={{margin: '0'}}>{`${headerInfo.club_members.length} members`}</p>;
	const openChat = useOpenChat();
	const setOpenChat = useSetOpenChat();

	const handleBack = e => {
		e.preventDefault();

		setOpenChat({
			...openChat,
			open: false,
		});
	}

	const handleSett = e => {
		e.preventDefault();

		setOpenSett(!openSett);
	}	

	const clubInfo = <Box sx={{height: '50%', display: 'flex', flexDirection: 'column'}}>
		{clubName}
		{clubMem}
	</Box>

	return (
		<Box sx={{height: '10%', width: '100%', position: 'relative', display: 'flex', 
			alignItems: 'flex-end', justifyContent: 'space-evenly', borderBottom: '1px solid black',
			backgroundColor: 'pink'}}>
			<p onClick={handleBack} style={{position: 'absolute', left: '5%', cursor: 'pointer',}}>Back</p>
			{clubInfo}
			<p onClick={handleSett} style={{position: 'absolute', right: '5%', cursor: 'pointer',}}>sett</p>
		</Box>
		);
}

export { Header }
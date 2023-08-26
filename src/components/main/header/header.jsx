import { Box } from "@mui/material";
import SettingsIcon  from "@mui/icons-material/Settings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useOpenChat, useSetOpenChat } from "../../chatContext.jsx";

const Header = props => {
	const headerInfo = props.headerInfo;
	const openSett = props.openSett;
	const setOpenSett = props.setOpenSett;
	const backImage = props.backgroundImage;
	const style = {margin: '0', color: '#fff'};
	const clubName = <h5 style={style}>{headerInfo?.club_name}</h5>;
	const clubMem = <p style={style}>{`${headerInfo?.club_members?.length || 0} members`}</p>;
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
			alignItems: 'flex-end', justifyContent: 'space-evenly', borderBottom: '1px solid #adb5bd',
			backgroundImage: `url(${backImage})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat',
			 pb: '1rem'}}>
			<ArrowBackIcon onClick={handleBack} sx={{position: 'absolute', left: '5%', cursor: 'pointer',}} 
				size="small" color="white" />
			{clubInfo}
			<SettingsIcon onClick={handleSett} sx={{position: 'absolute', right: '5%', cursor: 'pointer'}} 
				color="white" />
		</Box>
		);
}

export { Header }
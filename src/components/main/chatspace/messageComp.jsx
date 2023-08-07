import { Box, Avatar } from "@mui/material";

const MessageBubble = props => {
	const userId = props.id;
	const userName = props.userName;
	const userMess = props.message;
	const userImgLink = props.imgLink;
	const dateNtime = props.dateNtime;
	const marg = '1.2rem';
	let borderRad = '0 8px 8px 0';

	return (
		<Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
			height: '60px', width: '45%', mt: marg, mb: marg, backgroundColor: 'gray',borderRadius: borderRad}}>
			<Avatar src={userImgLink} alt="" size="small" />
			<Box sx={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', 
				height: '100%', width: '100%',}}>
				<Box sx={{width: '100%', display: 'flex', justifyContent: 'space-evenly',}}>
					<h5>{userName}</h5>
					<Box sx={{width: '10%', height: '80%', borderRadius: '50%', border: '2px solid black',
						display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
						<p style={{fontSize: '12px'}}>G</p>
					</Box>
				</Box>
				<Box sx={{width: '100%', display: 'flex', justifyContent: 'space-evenly',}}>
					<p style={{fontSize: '15px'}}>{userMess}</p>
					<p style={{fontSize: '12px'}}>{dateNtime}</p>
				</Box>
			</Box>
		</Box>
		);
}

export { MessageBubble }
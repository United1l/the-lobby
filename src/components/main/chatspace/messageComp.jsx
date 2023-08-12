import { Box, Avatar } from "@mui/material";

const MessageBubble = props => {
	const user = props.user;
	const userName = props.userName;
	const userMess = props.message;
	const userImgLink = props.imgLink;
	const dateNtime = props.dateNtime;
	const setOpenGameD = props.setOpenGameD;
	const marg = '1.2rem';
	let borderRad = '0 8px 8px 0';
	let align = '';

	const handleGameD = e => {
		e.preventDefault();

		setOpenGameD(true);
	}

	if (user) align = 'flex-end';

	return (
		<Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', 
			height: '60px', maxWidth: '35%', mt: marg, mb: marg, alignSelf: align }}>
			<Avatar src={userImgLink} alt="" size="small" />
			<Box sx={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', 
				height: '100%', width: 'auto', backgroundColor: 'gray', borderRadius: borderRad, p: '0.3rem'}}>
				<Box sx={{width: '100%', display: 'flex', justifyContent: "space-evenly",}}>
					<h5>{userName}</h5>
					<Box sx={{width: '10%', height: '80%', borderRadius: '50%', border: '1px solid black',
						display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}
					 onClick={handleGameD}>
						<p style={{fontSize: '12px'}}>G</p>
					</Box>
				</Box>
				<Box sx={{width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
					<p style={{fontSize: '15px'}}>{userMess}</p>
					<p style={{fontSize: '10px'}}>{dateNtime}</p>
				</Box>
			</Box>
		</Box>
		);
}

export { MessageBubble }
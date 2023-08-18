import { Box, Avatar } from "@mui/material";

const MessageBubble = props => {
	const user = props.user;
	const userName = props.userName;
	const userMess = props.message;
	const userImgLink = props.imgLink;
	const dateNtime = props.dateNtime;
	const setOpenGameD = props.setOpenGameD;
	const marg = '1.2rem';
	let borderRad = '0 5px 8px 0';
	let align = '';

	const handleGameD = e => {
		e.preventDefault();

		setOpenGameD(true);
	}

	if (user) align = 'flex-end';

	return (
		<Box sx={{display: 'flex', alignItems: 'center', 
			minHeight: '74px', maxWidth: '38%', mt: marg, alignSelf: align }}>
			<Avatar src={userImgLink} alt="" size="small" />
			<Box sx={{display: 'flex', flexDirection: 'column',
				height: '100%', width: 'auto', backgroundColor: 'gray', borderRadius: borderRad, p: '0.3rem'}}>
				<Box sx={{width: '100%', height: '30%', display: 'flex', justifyContent: "space-evenly",
					alignItems: 'center'}}>
					<h5>{userName}</h5>
					<Box sx={{width: '10%', height: '80%', borderRadius: '50%', border: '1px solid black',
						display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}
					 onClick={handleGameD}>
						<p style={{fontSize: '12px'}}>G</p>
					</Box>
				</Box>
				<Box sx={{width: '100%', height: '65%', display: 'flex', alignItems: 'center',
					justifyContent: 'space-evenly'}}>
					<p style={{fontSize: '12px', overflowWrap: 'break-word', margin: '0.4rem'}}>{userMess}</p>
					<p style={{fontSize: '8px', overflowWrap: 'break-word'}}>{dateNtime}</p>
				</Box>
			</Box>
		</Box>
		);
}

export { MessageBubble }
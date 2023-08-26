import { Box, Avatar } from "@mui/material";
import { useColorContext } from "../../../contexts/color-mode/colorContext.jsx";

const MessageBubble = props => {
	const user = props.user;
	const userName = props.userName;
	const userMess = props.message;
	const userImgLink = props.imgLink;
	const dateNtime = props.dateNtime;
	const key = props.key;
	const setOpenGameD = props.setOpenGameD;
	const colorContext = useColorContext();
	const primary = colorContext.primary;
	const marg = '1.2rem';
	let borderRad = '0 5px 8px 0';
	let align = '';

	const handleGameD = e => {
		e.preventDefault();

		setOpenGameD(true);
	}

	if (user) align = 'flex-end';

	return (
		<Box sx={{display: 'flex', alignItems: 'center', mt: marg,
		 alignSelf: align }} maxHeight={72} maxWidth={380} minWidth={125} key={key}>
			<Avatar src={userImgLink} alt="" size="small" />
			<Box sx={{display: 'flex', flexDirection: 'column',
				height: '100%', width: 'auto', backgroundColor: primary, borderRadius: borderRad, p: '0.3rem'}}>
				<Box sx={{width: '100%', height: '30%', display: 'flex', justifyContent: "space-evenly",
					alignItems: 'center'}}>
					<h4>{userName}</h4>
					<Box sx={{width: '10%', height: '80%', borderRadius: '50%', border: '1px solid black',
						display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}
					 onClick={handleGameD}>
						<p style={{fontSize: '12px'}}>G</p>
					</Box>
				</Box>
				<Box sx={{width: '100%', height: '65%', display: 'flex', alignItems: 'center',
					justifyContent: 'space-evenly', mt: '0.5rem'}}>
					<h5 style={{overflowWrap: 'break-word', margin: '0.4rem'}}>{userMess}</h5>
					<p style={{fontSize: '8px', overflowWrap: 'break-word'}}>{dateNtime}</p>
				</Box>
			</Box>
		</Box>
		);
}

export { MessageBubble }
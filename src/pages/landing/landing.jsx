import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useColorContext } from "../../contexts/color-mode/colorContext.jsx";
import groupChat from "../images/landing/group-chat.svg"; 
import virtualHangout from "../images/landing/virtual-hangout.svg";
import MessageBro from "../images/landing/Messaging fun-bro.svg"; 

const Landing = (props) => {
	const navigate = useNavigate();
	const colorContext = useColorContext();
	const primary = colorContext.primary;
	const [matches, setMatches] = useState(
		window.matchMedia("(min-width: 768px)").matches
		);
	let imgH = 200;
	let direction = 'column';
	const buttonStyle = {margin: '0 0.5rem', color: primary};
	const hTheme = {color: primary};

	useEffect(() => {
		window.matchMedia("(min-width: 768px)").addEventListener('change', e => {
			setMatches(e.matches);
		});

	}, []);

	if (matches) {
		imgH = 400;
		direction = 'row';
	}

	const handleSignClick = e => {
		e.preventDefault();
		navigate('/register');
	}

	const handleLogClick = e => {
		e.preventDefault();
		navigate('/login');
	}

	return(
		<Box sx={{height: '100%', width: '100%',
			overflowY: 'auto', overflowX: 'hidden'}}>
				<Box sx={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column',
					alignItems: 'center', justifyContent: 'center', backgroundColor: primary,}}>
					<Box sx={{height: '7%', display: 'flex', justifyContent: 'flex-end', justifySelf: 'flex-start',
						alignSelf: 'flex-end', alignItems: 'center', position: 'absolute', top: '2%'}}>
						<Button variant="contained" sx={buttonStyle} onClick={handleSignClick}
							color="white">
							Sign up
						</Button>
						<Button variant="contained" sx={buttonStyle} onClick={handleLogClick}
							color="white">
							Log in
						</Button>
					</Box>
					<Box sx={{height: '90%', width: '100%', display: 'flex', flexDirection: direction,
						justifyContent: 'space-evenly', alignItems: 'center', p: '1rem'}}>
						<Box sx={{maxWidth: '40%', ml: '1rem'}}>
							<h1 style={{fontSize: 'clamp(40px, 2vw, 100px)', color: '#fff', margin: '0'}}>
								Welcome 
							</h1>
							<h1 style={{color: '#fff', margin: '0'}}>to</h1>
							<h1 style={{color: '#343a40'}}>The Lobby</h1>
							<h3 style={{color: '#fff'}}>Where game lovers hang out with game lovers</h3>
						</Box>
						<Box sx={{maxWidth: '50%'}}>
							<img src={groupChat} alt="group chat image" height={imgH} width={imgH}
							 /> 
						</Box>
					</Box>							
				</Box>
				<Box sx={{height: '80%', width: '100%', display: 'flex', flexDirection: direction,
						justifyContent: 'space-evenly', alignItems: 'center', p: '1rem'}}>
					<Box sx={{width: '50%'}}>
						<img src={virtualHangout} alt="virtual chat image" height={imgH} width={imgH} 
						/> 
					</Box>
					<Box sx={{width: '40%'}}>
						<h1 style={hTheme}>Settle down</h1>
						<h3 style={hTheme}>And talk about games you're currently playing <br />
								and enjoy in club group chats with friends</h3>
					</Box>
				</Box>
				<Box sx={{height: '80%', width: '100%', display: 'flex', flexDirection: direction,
						justifyContent: 'space-evenly', alignItems: 'center', p: '1rem'}}>
					<Box sx={{width: '40%'}}>
						<h1 style={hTheme}>Create a club</h1>
						<h3 style={hTheme}>And invite your friends to The Lobby</h3>
					</Box>
					<Box sx={{width: '50%'}}>
						<img src={MessageBro} alt="message-bro chat image" height={imgH} width={imgH} 
						/> 
					</Box>					
				</Box>		
			</Box>
	);
}

export { Landing };
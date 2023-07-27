import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const toggle = (bool, fn) => {
	const boolData = window.localStorage.setItem('boolData', bool);
	fn(bool);
}

const Landing = (props) => {
	const navigate = useNavigate();
	const marginSides = {margin: '0 0.5rem',};

	const handleSignClick = e => {
		e.preventDefault();
		toggle(true, props.setSignUP);
		navigate('/user-form');
	}

	const handleLogClick = e => {
		e.preventDefault();
		toggle(false, props.setSignUP);
		navigate('/user-form');
	}

	return(
		<Grid container height="95vh">
				<Grid item xs={12}>
					<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
						<Button variant="outlined" sx={marginSides} onClick={handleSignClick}>
							Sign up
						</Button>
						<Button variant="outlined" sx={marginSides} onClick={handleLogClick}>
							Log in
						</Button>
					</Box>
					<Box sx={{height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
						<h1>The Lobby</h1>
						<h3>Where game lovers hang out with game lovers</h3>
					</Box>	
				</Grid>		
			</Grid>
	);
}

export { Landing, toggle };
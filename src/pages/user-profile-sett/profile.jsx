import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOne, useDelete } from "@refinedev/core"; 
import { ThemedTitleV2 } from "@refinedev/mui";
import { Box, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserProfile = props => {
	const navigate = useNavigate();
	const { mutate } = useDelete();
	const mb = '1rem';
	let userData = {};
	let userClubs = null;
	let  userGames = null;

	const Id = localStorage.getItem('userId') || sessionStorage.getItem('userId');

	const { data, isLoading } = useOne({
		resource: "USER_ACCOUNT",
		id: Id,
	});

	userData = data?.data ?? "";

	if (isLoading) return <div>Loading...</div>;
	
	userClubs = userData?.game_club;
	userGames = userData?.games;

	const handleUpdate = e => {
		e.preventDefault();

		navigate('/update-password');
	}

	const handleBack = e => {
		e.preventDefault();

		navigate('/dashboard');
	}

	const handleDelete = e => {
		e.preventDefault();

		mutate({
			resource: 'USER_ACCOUNT',
			id: Id,
		});

		navigate('/');
	}

	return (
		<Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center',
			alignItems: 'center', position: 'relative'}}>
			<ArrowBackIcon onClick={handleBack} sx={{position: 'absolute', top: '2%', left: '2%', cursor: 'pointer', 
				margin: '0 1rem'}} size="small" color="secondary" />	
			<Paper sx={{width: '70%', height: '60%', display: 'flex', flexDirection: 'column', 
			justifyContent: 'center', alignItems: 'center', p: '1rem'}}>
				<ThemedTitleV2
					collapsed={false}
					text="The Lobby"
				/>
				<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: mb}}>
					<h3 style={{margin: '0.3rem'}}>Username</h3>	
					<h5 style={{margin: '0.2rem'}}>{userData?.user_name}</h5>
				</Box>		
				<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: mb}}>
					<h3 style={{margin: '0.3rem'}}>Email</h3>	
					<h5 style={{margin: '0.2rem'}}>{userData?.user_email}</h5>
				</Box>
				<Box sx={{width: '70%', height: '30%', display: 'flex', flexDirection: 'column',
					alignItems: 'center', mb: mb}}>
					<h3 style={{margin: '0.3rem'}}>Clubs</h3>
					{userClubs?.map(club => <h5 style={{margin: '0.2rem'}} key={club}>{club}</h5>)}
				</Box>
				<Box sx={{width: '70%', height: '30%', display: 'flex', flexDirection: 'column',
					alignItems: 'center', mb: mb}}>
					<h3 style={{margin: '0.3rem'}}>Games</h3>
					{userGames?.map(game => <h5 style={{margin: '0.2rem'}} key={game}>{game}</h5>)}
				</Box>
				<p onClick={handleUpdate} style={{color: 'blue', cursor: 'pointer', marginBottom: '0.5rem'}}>Update Password</p>
				<p onClick={handleDelete} style={{color: 'red', cursor: 'pointer'}}>Delete account</p>								
			</Paper>
		</Box>
		);
}

export { UserProfile }
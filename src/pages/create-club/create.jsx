import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOne, useUpdate, useForm } from "@refinedev/core";
import { ThemedTitleV2, Create } from "@refinedev/mui";
import { Box, Paper, TextField, Button, FormControlLabel, Checkbox } from "@mui/material";

const CreateClub = props => {
	const [clubName, setClubName] = useState("");
	const [error, setError] = useState(false);
	const [checkedState, setCheckedState] = useState({ checkedItems: new Map() });
	const navigate = useNavigate();
	const { mutate } = useUpdate();
	const { onFinish } = useForm({
		action: "create",
	});
	const gameGenres = ["Single Player", "Multi-Player", "Online", "Offline", "Shooter",
		"Hack and Slash", "Lifestyle", "Other"];

	const Id = localStorage.getItem('userId') || sessionStorage.getItem('userId');

	const { data, isLoading } = useOne({
		resource: "USER_ACCOUNT",
		id: Id,
	});

	const userData = data?.data ?? "";

	if (isLoading) return <div>Loading...</div>;

	const handleChange = e => {
		e.preventDefault();

		setClubName(e.target.value);
	}

	const handleGenreChange = e => {
		e.preventDefault();

		const name = e.target.name;
		const isChecked = e.target.checked;

		setCheckedState(prevState => ({
			checkedItems: prevState.checkedItems.set(name, isChecked)
		}));
	}

	const handleBack = e => {
		e.preventDefault();

		navigate('/dashboard');
	}

	const handleCreate = () => {
		if (clubName == "") {
			setError(true);
			return;
		}

		let newGenres = [];
		for (let [key, value] of checkedState.checkedItems) {
			if (value) newGenres.push(key);
		}

		if (checkedState.checked) newGenres = [...newGenres, ...value];

		let newMem = [userData?.user_name];
		let newClub = [...userData.game_club, clubName];

		onFinish({
			club_name: clubName,
			club_genres: newGenres,
			club_admin: userData?.user_name,
			club_members: newMem,
		});

		mutate({
			resource: "USER_ACCOUNT",
			values: {
				game_club: newClub,
			},
			id: userData?.id,
		});

		navigate('/dashboard');
	}

	const renderedGenres = gameGenres.map(genre => {
			return (
				<FormControlLabel control={<Checkbox name={genre} 
					checked={checkedState.checkedItems.get(name)} onChange={handleGenreChange} />} 
					label={genre} key={genre} />
			);
		});

	return (
		<Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center',
			alignItems: 'center', position: 'relative'}}>
			<p style={{position: 'absolute', top: '2%', left: '2%', cursor: 'pointer', margin: '0 1rem'}} 
					onClick={handleBack}>
					Back
				</p>
				<Create saveButtonProps={{ onClick: handleCreate}}
					wrapperProps={{
						sx: {
							width: '70%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center'
						}
					}}>
					<span>
						<ThemedTitleV2
							collapsed={false}
							text="The Lobby"
						/>
						<TextField type="text" label="Club name" value={clubName} onChange={handleChange}
						error={error} variant="outlined" sx={{mb: '1rem', mt: '1rem'}} />
						<Box sx={{ width: '50%', height: '30%', display: 'flex', flexDirection: 'column', mb: '1rem', mt: '1rem'}}>
							<label style={{marginBottom: '1rem'}}>Genres</label>
							{renderedGenres}					
						</Box>
					</span>
				</Create>								
					
		</Box>
		);
}

export { CreateClub }
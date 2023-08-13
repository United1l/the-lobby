import { useState, useEffect } from "react";
import { useUpdate, useGetIdentity } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { ThemedTitleV2 } from "@refinedev/mui";
import { Paper, Box, TextField, Button } from "@mui/material";
import { GetGroupData } from "../../components/dataRequest";

const SetUserName = props => {
	const [username, setUserName] = useState("");
	const [disp, setDisp] = useState("flex");
	const { data } = useGetIdentity();
	const { mutate } = useUpdate();
	const navigate = useNavigate();
	const userId = data?.user?.id ?? 0;
	console.log(userId);

	const handleChange = e => {
		e.preventDefault();

		setUserName(e.target.value);
	}

	const handleProceed = e => {
		e.preventDefault();
		console.log('running');
		if (userId != 0) {
			mutate({
				resource: "USER_ACCOUNTS",
				values: {
					user_name: username,
				},
				id: userId,
			});

			navigate('/preferences');

			setDisp("none");
		}

		return;
	}

	return (
		<Paper sx={{height: '100%', display: disp, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%',}}>
			<Box sx={{height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
				<ThemedTitleV2
					collapsed={false}
					text="The Lobby"
				/>
				<h3>Set username</h3>
				<TextField type="text" label="Username" value={username} onChange={handleChange}
					variant="outlined" />
				<Button variant="contained" onClick={handleProceed}>Proceed</Button>
			</Box>				
		</Paper>
		);
}

export { SetUserName }
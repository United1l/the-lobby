import { 
	Dialog, DialogTitle, DialogContent 
} from "@mui/material";

const UserGameDialog = props => {
	const userGames = props.userGames;
	const open = props.open;
	const setOpenGameD = props.setOpenGameD;
	const children = userGames?.map(game => {
		return <h6 key={game}>{game}</h6>;
	});

	const handleClose = e => {
		e.preventDefault();

		setOpenGameD(false);
	}

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>
				<h3>Currently playing</h3>
			</DialogTitle>
			<DialogContent>
				{children}	
			</DialogContent>
		</Dialog>
		);
}

export { UserGameDialog }
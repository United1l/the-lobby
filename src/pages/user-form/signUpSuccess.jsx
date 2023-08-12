import { Card, Alert, AlertTitle } from "@mui/material";

const SignUpSuccess = () => {
	return (
		<Card variant="outlined">
			<Alert severity="info">
				<AlertTitle>Confirm Email</AlertTitle>
				To proceed to the next page, you must confirm your 
				email address in your inbox
			</Alert>
		</Card>
		);
}

export { SignUpSuccess }
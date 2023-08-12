import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

const ForgotPassword = () => {
	return (
		<AuthPage 
			type="forgotPassword"
			title={
				<ThemedTitleV2
					collapsed={false}
					text="The Lobby"
				/>	
			}
		/>
	);
}

export { ForgotPassword };
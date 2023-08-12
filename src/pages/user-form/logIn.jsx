import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

const LogIn = () => {
	return (
		<AuthPage 
			type="login"
			title={
				<ThemedTitleV2
					collapsed={false}
					text="The Lobby"
				/>	
			}
		/>	
	);
}

export { LogIn }
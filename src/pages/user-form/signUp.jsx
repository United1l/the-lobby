import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

const SignUp = () => {
	return (
		<AuthPage 
			type="register"
			title={
				<ThemedTitleV2
					collapsed={false}
					text="The Lobby"
				/>	
			}
		/>
	);
}

export { SignUp }
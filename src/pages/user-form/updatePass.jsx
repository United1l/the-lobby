import { AuthPage, ThemedTitleV2 } from "@refinedev/mui";

const UpdatePassword = () => {
	return (
		<AuthPage 
			type="updatePassword"
			title={
				<ThemedTitleV2
					collapsed={false}
					text="The Lobby"
				/>	
			}
		/>
	);
}

export { UpdatePassword };
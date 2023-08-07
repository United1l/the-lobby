import { useState } from "react";
import { Textfield } from "../../components/textfield.jsx";
import { toggle } from "../landing/landing.jsx";
import { Layout } from "./layout.jsx";
import { HandleChange } from "./handleChange.jsx";

const SignUp = props => {
	const [email, setEmail] = useState("");
	
	const question = "Already have an account?";

	const handleSignClick = e => {
		e.preventDefault();
		toggle(false, props.setSignUP);
	}

	return (
		<Layout title="Sign up" btnText="Sign up" question={question} link="Log in" email={email}
			isSign={true} password={props.passwordprop} username={props.usernameprop} error={props.error} setError={props.setError}
			clickEvt={handleSignClick}>
			{props.username}
			<Textfield type="email" label="Email" value={email} error={props.error.emailErr}
			helperText={props.error.emailErrMsg} 
			onChange={e => HandleChange(e, setEmail, email, props.setError, props.error.emailErr)} />
			{props.password}	
		</Layout>
	);
}

export { SignUp }
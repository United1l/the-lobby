import {  useState } from "react";
import { Textfield } from "../../components/textfield.jsx";
import { SignUp } from "./signUp.jsx";
import { LogIn } from "./logIn.jsx";
import { HandleChange } from "./handleChange.jsx";

const FormCheck = props => {
	const [username, setUsername] = useState("");
	const [password, setPass] = useState("");
	const [error, setError] = useState({
		userErrMsg: "",
		emailErrMsg: "",
		passErrMsg: "",
		usernameErr: false,
		emailErr: false,
		passwordErr: false,
	});
	const userName = <Textfield type="text" label="Username" value={username} error={error.usernameErr}
		helperText={error.userErrMsg} 
		onChange={e => HandleChange(e, setUsername, username, setError, error.usernameErr)} />;

	const Password = <Textfield type={"password"} label="Password" value={password} error={error.passwordErr}
		helperText={error.passErrMsg} onChange={e => HandleChange(e, setPass, password, setError, error.passwordErr)} />;

	return props.signUp? <SignUp setSignUP={props.setSignUP} password={Password} username={userName} 
	usernameprop={username} passwordprop={password} error={error} setError={setError} />: 
		<LogIn setSignUP={props.setSignUP} password={Password} username={userName} usernameprop={username} 
		passwordprop={password} error={error} setError={setError} />;
}

export { FormCheck };
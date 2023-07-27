import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreate, useOne } from "@refinedev/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { toggle } from "../landing/landing.jsx";

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
		onChange={e => handleChange(e, setUsername, username, setError, error.usernameErr)} />;

	const Password = <Textfield type={"password"} label="Password" value={password} error={error.passwordErr}
		helperText={error.passErrMsg} onChange={e => handleChange(e, setPass, password, setError, error.passwordErr)} />;

	return props.signUp? <SignUp setSignUP={props.setSignUP} password={Password} username={userName} 
	usernameprop={username} passwordprop={password} error={error} setError={setError} />: 
		<LogIn setSignUP={props.setSignUP} password={Password} username={userName} usernameprop={username} 
		passwordprop={password} error={error} setError={setError} />;
}

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
			onChange={e => handleChange(e, setEmail, email, props.setError, props.error.emailErr)} />
			{props.password}	
		</Layout>
	);
}

const LogIn = props => {
	const question = "Don't have an account?";
	const forgotPass = <Link to="/forgot">forgot password?</Link>;

	const handleLogClick = e => {
		e.preventDefault();
		toggle(true, props.setSignUP);
	}

	return (
		<Layout title="Log in" btnText="Log in" question={question} link="Sign up" 
			password={props.passwordprop} username={props.usernameprop} error={props.error} setError={props.setError}
			forgotPass={forgotPass} clickEvt={handleLogClick}>
				{props.username}
				{props.password}	
			</Layout>
		);
}

const Layout = props => {	
	const email = props.email;
	const username = props.username;
	const password = props.password;
	const error = props.error;
	const setError = props.setError;
	const [passwrd_retype, setPassRetype] = useState("");
	const [id, setId] = useState(1);
	const children = props.children;

	const { mutate } = useCreate();
	const navigate = useNavigate();
	
	const getUser = () => {
		const { data, isLoading, isError} = useOne({
			resource: "USER_ACCOUNTS",
			id,
		});

		const user = data?.data;

		if (isLoading) {
			return <div>Loading...</div>
		}

		if (isError) {
			return <div>Something went wrong</div>
		}

		const { user_name } = user;
		return user_name;
	}

	const logUser = user => {
		if (username == user) {
			// Add username to local storage to persist a logged in state
			localStorage.setItem('user', username);

			// Go to dashboard page
			navigate('/dashboard');
			} else {
			setId(id + 1);
			getUser();
			logUser(user_name);
		}
	}

	const handleSubmit = e => {
		e.preventDefault();

	 	if (props.isSign) {
				if (username && username.length > 7 && email && email.includes("@") && password && password.length > 8 && password === passwrd_retype) {
					setError({
						userErrMsg: "",
						emailErrMsg: "",
						passErrMsg: "",
						usernameErr: false,
						emailErr: false,
						passwordErr: false,
					});

					mutate({
						resource: "USER_ACCOUNTS",
						values: {
							user_name: username, 
							email: email, 
							password: password, 
							passwrd_retype: passwrd_retype,
						},
					});

					// Add username to local storage to persist a logged in state
					localStorage.setItem('user', username);

					// Go to preference page
					navigate('/preferences');
				} else {
					setError({
						...error,
						userErrMsg: (!username || username.length < 7)?"Username must be at least 7 characters": "",
						usernameErr: (!username || username.length < 7)? true: false,
						emailErrMsg: (!email || !email.includes("@"))?"Email is incorrect": "",
						emailErr: (!email || !email.includes("@"))? true: false,
						passErrMsg: (!password || password.length < 8 || password !== passwrd_retype)?"Passwords must be at least 8 characters and equal": "",
						passwordErr: (!password || password.length < 8 || password !== passwrd_retype)? true: false,
					});
					return;
				} 

		} else {
			if (username && username.length > 7 && password && password.length > 8) {
				setError({
					...error,
					userErrMsg: "",
					passErrMsg: "",
					usernameErr: false,
					passwordErr: false,
				}); 

				getUser();
				logUser(user_name);
			} else {
				setError({
						...error,
						userErrMsg: (!username || username.length < 7)?"Username must be at least 7 characters": "",
						usernameErr: (!username || username.length < 7)? true: false,
						passErrMsg: (!password || password.length < 8 || password !== passwrd_retype)?"Passwords must be at least 8 characters and equal": "",
						passwordErr: (!password || password.length < 8 || password !== passwrd_retype)? true: false,
					});
				return;
			}
		}
	}  


	return (	
		<Box sx={{height: '95vh', width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
			<Box sx={{height: '70%', width:'70%', padding: '0 0.5rem', 
			display: 'flex', flexDirection: 'column', 
			justifyContent: 'space-evenly', alignItems: 'center', border: '2px solid #ff4'}}>
				<h2>{props.title}</h2>
				{children}
				{props.isSign && <Textfield type={"password"} label="Re-type password" value={passwrd_retype} 
				 error={props.error.passwordErr} helperText={error.passErrMsg} onChange={e => handleChange(e, setPassRetype, password, setError, error.passwordErr)} />}
				<Button variant="contained" onClick={handleSubmit}>{props.btnText}</Button>
				<h4>{props.question}<Link to="/user-form" onClick={props.clickEvt}>{props.link}</Link></h4>
				<h4>{props.forgotPass}</h4>
			</Box>
		</Box>
	);
}

const Textfield = (props) => {
	return <TextField variant="outlined" type={props.type} label={props.label} 
	value={props.value} helperText={props.helperText} error={props.error} 
	required onChange={props.onChange} />;
}

const handleChange = (e, fn1, bool, fn2, error) => {
	fn1(e.target.value);
	setDef(bool, fn2, error);
}

const setDef = (bool, fn, error) => {
	fn({
		error: bool? false: true,
	})
}

export { FormCheck, setDef };
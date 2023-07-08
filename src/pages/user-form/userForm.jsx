import {  useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { withErrorBoundary } from "../../components/withErrorBoundary.jsx";
import { toggle } from "../landing/landing.jsx";

const FormCheck = props => {
	const [username, setUsername] = useState("");
	const [password, setPass] = useState("");
	const [error, setError] = useState({
		errorMsg: null,
		usernameErr: false,
		emailErr: false,
		passwordErr: false,
	});
	const userName = <Textfield type="text" label="Username" value={username} bool={error.usernameErr}
	onChange={e => handleChange(e, setUsername)} />;
	const Password = <Textfield type={"password"} label="Password" value={password} bool={error.passwordErr}
	onChange={e => handleChange(e, setPass)} />;

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
			<Textfield type="email" label="Email" value={email} bool={props.error.emailErr}
			onChange={e => handleChange(e, setEmail)} />
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
			clickEvt={handleLogClick}>
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
	const [password_retype, setPassRetype] = useState("");
	const children = props.children;
	const userError = "Please fill out all the fields correctly"; 

	const handleSubmit = async (e) => {
	e.preventDefault();

	 if (props.isSign) {
		if (!username  || !email || !password || !password_retype) {
			if(username.length < 5 ) {
				setError({errorMsg: "Username must be at least 5",
					usernameErr: true, 
				});
				console.log(error.usernameErr)
			}

			if(email.length < 12) {
				setError({errorMsg: "Email is invalid",
					emailErr: true,
				});
				console.log(error.emailErr)
			}

			if(password.length < 8) {
				setError({errorMsg: "Password must be at least 8",
					passwordErr: true,
				});
				console.log(error.passwordErr)
			}

			if(!password_retype) {
				setError({errorMsg: userError,
					passwordErr: true,
				})
			}
			setError({errorMsg: userError})
			return;
		} else {
			setError(prevstate => {errorMsg: null});

			const { data, error } = await props.superbase.from("USER_ACCOUNTS").insert([{ username, email, password, password_retype }]);


			if (error) {
				setError(prevstate => {errorMsg: null});
				return;
			}

			if (data) {
				console.log(data);
				setError(prevstate => {errorMsg: null});
			}
		}
	} else {
		if (!username || !password) {
			setError(prevstate => {errorMsg: userError});
			return;
		} else {
			const { data, error } = await props.superbase.from("USER_ACCOUNTS").select().eq("username", username).single();

			if (error) {
				setError(prevstate => {errorMsg: userError});
				return;
			}

			if (data) {
				console.log(data);
				setError(prevstate => {errorMsg: null});

				if (password == data.password) return;
			}
		}
	}  
}

	return (	
		<Box sx={{height:'100vh', width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
			<Box sx={{height: '70%', width:'70%', padding: '0 0.5rem', 
			display: 'flex', flexDirection: 'column', 
			justifyContent: 'space-evenly', alignItems: 'center', border: '2px solid #ff4'}}>
				<h2>{props.title}</h2>
				{children}
				{props.isSign && <Textfield type={"password"} label="Re-type password" value={password_retype} 
				 bool={props.error.passwordErr} onChange={e => handleChange(e, setPassRetype)} />}
				<Button variant="contained" onClick={handleSubmit}>{props.btnText}</Button>
				<h4>{props.question}<Link to="/user-form" onClick={props.clickEvt}>{props.link}</Link></h4>
				<h4>{props.forgotPass}</h4>
				{error.errorMsg && <p style={{color: 'red'}}>{error.errorMsg}</p>}
			</Box>
		</Box>
	);
}

const Textfield = (props) => {
	return <TextField variant="outlined" type={props.type} label={props.label} 
	value={props.value} error={props.bool} required onChange={props.onChange} />;
}

const handleChange = (e, fn) => {
	fn(e.target.value)
}

const errorBoundary = withErrorBoundary(FormCheck);

export { FormCheck };
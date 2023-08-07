import {  useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreate, useMany } from "@refinedev/core";
import { Box, Button } from "@mui/material";
import { Textfield } from "../../components/textfield.jsx";
import { GetGroupData } from "../../components/dataRequest.jsx";
import { HandleChange } from "./handleChange.jsx";

const Layout = props => {	
	const email = props.email;
	const username = props.username;
	const passwrd = props.password;
	const error = props.error;
	const setError = props.setError;
	const children = props.children;
	const [passwrd_retype, setPassRetype] = useState("");
	let numArr = [];
	for (let i = 0; i < 50; i++) {
		let index = i + 1;
		numArr.push(index);
	}

	const [ids, setIds] = useState(numArr);
	const { mutate } = useCreate();
	const navigate = useNavigate();

	const users = GetGroupData("USER_ACCOUNTS", ids);

	const logUser = () => {
		for (let i = 0; i < users.length; i++) {
			const { id, user_name, password } = users[i];
			
			if (username == user_name && passwrd == password) {
				// Add username to local storage to persist a logged in state
				localStorage.setItem('user', username);
				localStorage.setItem('id', id);
				
				// Go to dashboard page
				navigate('/dashboard');
			} else {
				const newIds = ids.map(id => id + 50);
				setIds(newIds);
			}
		}
	}

	const handleSubmit = e => {
		e.preventDefault();

	 	if (props.isSign) {
				if (username && username.length > 7 && email && email.includes("@") && passwrd && passwrd.length > 8 && passwrd === passwrd_retype) {
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
							password: passwrd, 
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
						passErrMsg: (!passwrd || passwrd.length < 8 || passwrd !== passwrd_retype)?"Passwords must be at least 8 characters and equal": "",
						passwordErr: (!passwrd || passwrd.length < 8 || passwrd !== passwrd_retype)? true: false,
					});
					return;
				} 

		} else {
			if (username && username.length > 7 && passwrd && passwrd.length > 8) {
				setError({
					...error,
					userErrMsg: "",
					passErrMsg: "",
					usernameErr: false,
					passwordErr: false,
				}); 
				logUser();
			} else {
				setError({
						...error,
						userErrMsg: (!username || username.length < 7)?"Username must be at least 7 characters": "",
						usernameErr: (!username || username.length < 7)? true: false,
						passErrMsg: (!passwrd || passwrd.length < 8 || passwrd !== passwrd_retype)?"Passwords must be at least 8 characters and equal": "",
						passwordErr: (!passwrd || passwrd.length < 8 || passwrd !== passwrd_retype)? true: false,
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
				 error={props.error.passwordErr} helperText={error.passErrMsg} onChange={e => HandleChange(e, setPassRetype, password, setError, error.passwordErr)} />}
				<Button variant="contained" onClick={handleSubmit}>{props.btnText}</Button>
				<h4>{props.question}<Link to="/user-form" onClick={props.clickEvt}>{props.link}</Link></h4>
				<h4>{props.forgotPass}</h4>
			</Box>
		</Box>
	);
}

export { Layout }
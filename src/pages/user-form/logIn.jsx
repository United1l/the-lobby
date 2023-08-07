import {  useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toggle } from "../landing/landing.jsx";
import { Layout } from "./layout.jsx";

const LogIn = props => {
	const [loggedUser, setLoggedUser] = useState("");
	const navigate = useNavigate();
	const question = "Don't have an account?";
	const forgotPass = <Link to="/forgot">forgot password?</Link>;

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (user) setLoggedUser(user);
	}, []);

	if (loggedUser) navigate('/dashboard');

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

export { LogIn }
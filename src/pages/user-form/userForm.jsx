import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { withErrorBoundary } from "../../components/withErrorBoundary.jsx";
import { toggle } from "../landing/landing.jsx";

const FormCheck = (props) => {
	const handleSignClick = e => {
		e.preventDefault();
		toggle(false, props.setSignUP);
	}

	const handleLogClick = e => {
		e.preventDefault();
		toggle(true, props.setSignUP);
	}

	const SignUp = () => {
		const question = "Already have an account?";
		return (
			<Layout title="Sign up" btnText="Sign up" question={question} link="Log in" clickEvt={handleSignClick}>
				<Textfield type="email" label="Email"/>
				<Textfield type="text" label="Password"/>	
			</Layout>
			);
	}

	const LogIn = () => {
		const question = "Don't have an account?";
		return <Layout title="Log in" btnText="Log in" question={question} link="Sign up" clickEvt={handleLogClick}/>;
	}

	return props.signUp? <SignUp />: <LogIn />;
}

const Layout = (props) => {
	const children = props.children;

	return (	
			<Box sx={{height:'100vh', width: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				<Box sx={{height: '70%', width:'90%', padding: '0 0.5rem', 
				display: 'flex', flexDirection: 'column', 
				justifyContent: 'space-evenly', alignItems: 'center', border: '2px solid #000'}}>
					<h2>{props.title}</h2>
					<Textfield type="text" label="Username"/>
					{children}
					<Textfield type="text" label="Password"/>
					<Button variant="contained">{props.btnText}</Button>
					<h4>{props.question}<Link to="/user-form" onClick={props.clickEvt}>{props.link}</Link></h4>
				</Box>
			</Box>
		);
}

const Textfield = (props) => {
	return <TextField variant="outlined" type={props.type} label={props.label} />;
}

const errorBoundary = withErrorBoundary(FormCheck);

export { FormCheck };
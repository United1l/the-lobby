import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormCheck } from '../pages/user-form/userForm.jsx';

test('renders a sign up form or log in form component', () => {
		 const sign = true;

		 render(<FormCheck />);

		 // ACT

		 const logInTxt = screen.getAllByText("Log in");
		 const signUpTxt = screen.getAllByText("Sign up");
		 const userName = screen.getAllByLabelText("Username");
		 const email = screen.getByLabelText("Email");
		 const pass = screen.getAllByLabelText("Password");
		 const signUpBtn = screen.getByRole("button", {name: 'Sign up'});
		 const logInBtn = screen.getByRole("button", {name: 'Log in'});

		 // ASSERT

		 for (let i=0; i < logInTxt.length; i++) {
		 	expect(logInTxt[i]).toBeInTheDocument()
		 }

		 for (let i=0; i < signUpTxt.length; i++) {
		 	expect(signUpTxt[i]).toBeInTheDocument()
		 }

		 for (let i=0; i < userName.length; i++) {
		 	expect(userName[i]).toBeInTheDocument()
		 }
		 expect(email).toBeInTheDocument()
		 
		 for (let i=0; i < pass.length; i++) {
		 	expect(pass[i]).toBeInTheDocument()
		 }
		 expect(signUpBtn).toHaveTextContent("Sign up");
		 
})
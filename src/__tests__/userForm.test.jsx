import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormCheck, setDef } from '../pages/user-form/userForm.jsx';
import { jest } from '@jest/globals';

test('renders a sign up form or log in form component', () => { 
		 render(<MemoryRouter><FormCheck signUp={true} /></MemoryRouter>);

		 // ACT

		 const sign = true;
		 const prop = "";

		 const func = jest.fn();

		 const logInTxt = screen.getAllByText("Log in");
		 const signUpTxt = screen.getAllByText("Sign up");
		 const userName = screen.getByText("Username");
		 const email = screen.getByText("Email");
		 const pass = screen.getByText("Password");
		 const passRetype = screen.getByText("Re-type password");

		 setDef(sign, func, prop);

		 // ASSERT

		 for (let i=0; i < logInTxt.length; i++) {
		 	expect(logInTxt[i]).toBeInTheDocument()
		 }

		 for (let i=0; i < signUpTxt.length; i++) {
		 	expect(signUpTxt[i]).toBeInTheDocument()
		 }

		 expect(userName).toBeInTheDocument();
		 expect(email).toBeInTheDocument();
		 expect(pass).toBeInTheDocument();
		 expect(passRetype).toBeInTheDocument();

		 expect(func).toHaveBeenCalled();


		 
})
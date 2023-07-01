import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { FormCheck } from '../pages/user-form/userForm.jsx';

test('renders a sign up form or log in form component', () => {
		 const sign = true;
		 const fn = jest.fn();

		 render(<FormCheck />);

		 // ACT
		 const title = screen.getByText("Sign up");
		 const userName = screen.getByLabelText("Username");
		 const email = screen.queryByLabelText("Email");
		 const pass = screen.getByLabelText("Password");
		 const signUpBtn = screen.queryByRole("Button", {name: 'Sign up'});

		 // ASSERT

		 expect(title).toBeInTheDocument();
		 expect(userName).toBeInTheDocument();
		 expect(email).toHaveTextContent("Sign up");
		 expect(pass).toBeInTheDocument();
		 expect(signUpBtn).toHaveTextContent("Sign up");
		 
})
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Landing, toggle } from '../pages/landing/landing.jsx';
import { jest } from '@jest/globals';

test('renders two two buttons, a title and a tagline', () => {
	render(<Landing />);

	// ACT

	const func = jest.fn();
	const bool = false;

	toggle(func, bool);

	const signUpBtn = screen.getByRole('button', {name: 'Sign up'});
	const logInBtn = screen.getByRole('button', {name: 'Log in'});
	const title = screen.getByText('The Lobby');
	const tagline = screen.getByText('Where game lovers hang out with game lovers');

	// ASSERT

	expect(func).toHaveBeenCalledWith(bool);

	expect(signUpBtn).toBeInTheDocument();
	expect(logInBtn).toBeInTheDocument();
	expect(title).toBeInTheDocument();
	expect(tagline).toBeInTheDocument(); 
})
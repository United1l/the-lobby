import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Recommended } from '../pages/recommended/recommended.jsx';

test("renders the recommended component", () => {
	render(<Recommended />);

	// ACT
	const title = screen.getByText("Recommended Clubs");
	const submitBtn = screen.getByRole("button", {name: 'Submit'});

	// ASSERT

	expect(title).toBeInTheDocument();
	expect(submitBtn).toBeInTheDocument();
})
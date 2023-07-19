import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Preferences } from '../pages/preferences/preferences.jsx';

test("renders a preference component", () => {
	render(<Preferences />);

	// ACT
	const title = screen.getByText("Preferences");
	const gameCatTitle1 = screen.getByText("Single Player");
	const gameCatTitle2 = screen.getByText("Multi-Player");
	const proceedBtn = screen.getByRole("button", {name: 'Proceed'});

	// ASSERT

	expect(title).toBeInTheDocument();
	expect(gameCatTitle1).toBeInTheDocument();
	expect(gameCatTitle2).toBeInTheDocument();
	expect(proceedBtn).toBeInTheDocument();
})
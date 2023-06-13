import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './Signup';
;

describe('Signup component', () => {
  it('Unit test: renders the signup form', () => {
    const { getByRole } = render(
        <Router>
          <Signup />
        </Router>
      );

    const usernameInput = screen.getByRole('textbox', { name: 'Username' });
    const buttonInput = screen.getByRole('button', { name: 'Sign up' });
    expect(usernameInput).toBeInTheDocument();
    expect(buttonInput).toBeInTheDocument();
  });
});

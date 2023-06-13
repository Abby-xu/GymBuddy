import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
;

describe('Login component', () => {
  it('Unit test: renders the login form', () => {
    const { getByRole } = render(
        <Router>
          <Login />
        </Router>
      );

    const usernameInput = screen.getByRole('textbox', { name: 'Username' });
    const buttonInput = screen.getByRole('button', { name: 'Login' });
    expect(usernameInput).toBeInTheDocument();
    expect(buttonInput).toBeInTheDocument();
  });
});
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ResponsiveAppBar from './ResponsiveAppBar';
import { AuthProvider } from "../auth";
import { BrowserRouter as Router } from 'react-router-dom';

describe('ResponsiveAppBar', () => {
  it('Unit test: should render the AppBar with title GymBuddy', () => {
    render(<AuthProvider><Router><ResponsiveAppBar /></Router></AuthProvider>);
    const titleElements = screen.queryAllByText('GymBuddy');
    expect(titleElements).toHaveLength(2);
  });

  it('Integration test: should navigate to /newreservation on clicking the New Reservation button', () => {
    const { getByText } = render(<AuthProvider><Router><ResponsiveAppBar /></Router></AuthProvider>);
    fireEvent.click(getByText('New Reservation'));
    expect(window.location.pathname).toBe('/newreservation');
  });

});

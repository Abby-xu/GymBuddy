import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react';
import NewReservation from './NewReservation';
import { AuthProvider } from "../auth";
import { BrowserRouter as Router } from 'react-router-dom';

test('Unit test: renders NewReservation component', () => {
  render(
    <AuthProvider>
      <Router>
        <NewReservation />
      </Router>
    </AuthProvider>
  );
  const buttonInput = screen.getByRole('button', { name: 'Book' });
  expect(buttonInput).toBeInTheDocument();
});


it('Integration test: display schedule view when both equipment and date are selected', async () => {
  // Arrange
  render(<AuthProvider>
    <Router>
      <NewReservation />
    </Router>
  </AuthProvider>);

  const datePicker = screen.getByLabelText('Choose your date');
  const equipmentSelector = screen.getByText(/Cardio/i);
  // Act

  fireEvent.click(equipmentSelector);
  fireEvent.change(datePicker, { target: { value: '2022-12-12' } });
  const scheduleView = screen.getByText('Find Your Equipment');

  // Assert
  expect(scheduleView).toBeInTheDocument();
});
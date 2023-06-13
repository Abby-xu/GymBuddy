import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import ReservationTable from './ReservationTable';
import { AuthProvider } from "../auth";

test('Unit test: renders ReservationTable component', () => {
  render(
    <AuthProvider>
      <ReservationTable />
    </AuthProvider>
  );
  const Date = screen.getByText('Date');
  expect(Date).toBeInTheDocument();
});
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('Unit test: renders dashboard component', () => {
  render(<Dashboard />);
  const availableEquipment = screen.getByText('AVAILABLE EQUIPMENT');
  expect(availableEquipment).toBeInTheDocument();
});


test('Integration test: displays availability and progress bar with fake data', async () => {
  const mockData = { data: [[80]] };
  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
  const { getByText, getByTestId } = render(<Dashboard />);
expect(fetch).toHaveBeenCalledTimes(1);
  expect(getByText('AVAILABLE EQUIPMENT')).toBeInTheDocument();
  expect(getByText('TOTAL EQUIPMENT')).toBeInTheDocument();
});

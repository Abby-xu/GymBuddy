// Import dependencies and component
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Home from './Home';

// Start tests
describe('Home component', () => {
  test('Unit test: renders dashboard and equipment map', () => {
    // Render the Home component
    const { getByText, getByRole } = render(<Home />);

    // Check that the dashboard is rendered
    expect(getByText('AVAILABLE EQUIPMENT')).toBeInTheDocument();
  });

  test('Unit test: renders equipment map legend', () => {
    // Render the Home component
    const { getByText } = render(<Home />);

    // Check that the available legend item is rendered
    expect(getByText('Available')).toBeInTheDocument();

    // Check that the in use legend item is rendered
    expect(getByText('In Use')).toBeInTheDocument();

    // Check that the maintenance legend item is rendered
    expect(getByText('Maintenance')).toBeInTheDocument();
  });
});

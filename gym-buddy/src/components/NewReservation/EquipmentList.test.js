import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import EquipmentList from './EquipmentList';

test('Unit test: renders equipment list component with all equipment categories', () => {
  const { getByText } = render(<EquipmentList />);
  const cardioHeader = getByText(/Cardio/i);
  const resistanceHeader = getByText(/Resistance/i);
  const freeWeightHeader = getByText(/Free Weight/i);
  expect(cardioHeader).toBeInTheDocument();
  expect(resistanceHeader).toBeInTheDocument();
  expect(freeWeightHeader).toBeInTheDocument();
});


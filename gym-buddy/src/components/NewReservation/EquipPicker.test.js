import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import EquipPicker from './EquipPicker';

describe('EquipPicker', () => {
  const availEquip = [
    { location: 'Location 1' },
    { location: 'Location 2' },
    { location: 'Location 3' },
  ];
  
  const defaultLocation = 'Location 2';

  it('Integration test: renders all data from the parent components', () => {
    render(<EquipPicker availEquip={availEquip} location={defaultLocation} handleLocationChange={() => null} />);
  });

  it('Unit test: displays the correct heading', () => {
    render(<EquipPicker availEquip={availEquip} location={defaultLocation} handleLocationChange={() => null} />);
    const heading = screen.getByRole('heading', { name: 'Select Your Equipment Location' });
    expect(heading).toBeInTheDocument();
  });
});
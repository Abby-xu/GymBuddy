import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EquipmentMap from './EquipmentMap';

  

describe('EquipmentMap Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Integration test: Should render loading state while fetching api data', () => {
    render(<EquipmentMap />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeNull();
  });

});

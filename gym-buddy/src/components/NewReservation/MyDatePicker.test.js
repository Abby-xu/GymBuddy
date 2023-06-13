import React from 'react';
import { useEffect } from 'react'
import { render, fireEvent } from '@testing-library/react';
import MyDatePicker from './MyDatePicker';

describe('MyDatePicker component', () => {
  it('Unit test: renders without crashing', () => {
    render(<MyDatePicker setSelectedDate={()=>console.log('1')}/>);
  });

  it('Integration test: calls handleDateChange function when the date is changed', () => {
    const handleDateChange = jest.fn();
    const { getByLabelText } = render(<MyDatePicker setSelectedDate={()=>console.log('1')} handleDateChange={handleDateChange} />);
    fireEvent.change(getByLabelText(/Choose your date/i), { target: { value: '2022-01-01' } });
    expect(handleDateChange).toHaveBeenCalledTimes(1);
  });

});

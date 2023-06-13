import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Popup from './Popup';

test('Unit test: renders Popup component', () => {
    render(<Popup />);
  });
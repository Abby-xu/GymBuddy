import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import MonitorSystems from './MonitorSystems';

test('Unit test: renders MonitorSystems component', () => {
    render(<MonitorSystems />);
  });
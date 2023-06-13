import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import flipCard from './flipCard';

test('Unit test: renders flipCard component', () => {
    render(<flipCard />);
  });
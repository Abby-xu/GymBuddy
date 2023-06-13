import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import UsersList from './UsersList';

test('Unit test: renders UsersList component', () => {
    render(<UsersList />);
  });
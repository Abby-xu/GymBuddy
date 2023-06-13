import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import IssueLog from './Issuelog';

test('Unit test: renders IssueLog component', () => {
    render(<IssueLog />);
  });
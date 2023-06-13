import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import SurveyCollection from './SurveyCollection';

test('Unit test: renders SurveyCollection component', () => {
    render(<SurveyCollection />);
  });
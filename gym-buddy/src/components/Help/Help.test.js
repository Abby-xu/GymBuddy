import React from 'react';
import Help from './Help';
import { API_IP_ADDRESS } from "../../config";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import { AuthProvider } from "../auth";

describe('<Help />', () => {
  it('Unit test: should render without errors', () => {
    const component = <AuthProvider><Help /></AuthProvider>;
    const { container } = render(component);
    const wrapper = container.querySelector('.issue');
    expect(wrapper).toBeInTheDocument();
  });
});

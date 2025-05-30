import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import '@testing-library/jest-dom'; 

test('renders Navbar with correct links', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const linkElement = screen.getByText(/QuickCare/i);
  expect(linkElement).toBeInTheDocument();
});

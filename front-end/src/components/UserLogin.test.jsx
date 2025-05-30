import { screen , render } from "@testing-library/react";
import UserLogin from "./UserLogin";
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import React from 'react';


test('test input filed' , () => {

    render(
        <MemoryRouter>
          <UserLogin />
        </MemoryRouter>
      );
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const test1 = screen.getByPlaceholderText(/Enter your email/i) ;

    expect(emailInput).toBeInTheDocument();
    expect(test1).toBeInTheDocument();
})
